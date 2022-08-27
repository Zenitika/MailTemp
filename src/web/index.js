$(function () {
    // ───────────────────────────────────── Letters ───────────────────────────────────────────
    // Checks if there are new emails or not
    $("#update_emails").click(async function () {
        await eel.mailbox_check()
    })
    // Displays new messages
    eel.expose(mailbox_update)
    function mailbox_update(data) {
        const firstMenu = $('#mail_field');
        let id_list = []
        let id = data[0]["id"]
        if (id_list.includes(id) == false) {
            id_list.push(id);
            firstMenu.append(
                `<ul id="message">
                                <li id="id_message">
                                    Message number/id: ${id}
                                </li>
                                <li id="message_from">
                                    From whom: ${data[0]["from"]}
                                </li>
                                <li id="message_subject">
                                    Letter subject: ${data[0]["subject"]}
                                </li>
                                <li id="date">
                                    The date: ${data[0]["date"]}
                                </li>
                                <li>
                                    <button class="callback-button" id="${id}">Open letter</button>
                                </li>
                            </ul>`
            );
        }}
    // The function of opening a certain letter
    $(document).on("click", ".callback-button", async function (e) {
        e.preventDefault();
        $('.modal').addClass('modal_active');
        $('body').addClass('hidden');
        var id = $(this).attr('id');
        await eel.receiving_one_message(id)
    });
    // Displaying the contents of an email
    eel.expose(load_one_message)
    function load_one_message(data) {
        console.log(data)
        $('.modal__title').html(`${data["subject"]}`);
        $('#data_about_message').html(
                                      `Message number/id: ${data["id"]}</br>
                                       From whom: ${data["from"]}</br>
                                       Letter subject: ${data["subject"]}</br>
                                       The date: ${data["date"]}</br>`
        );
        $('#message_body').html(`</br>${data["body"]}`);
        $('#files_message').html(`</br>Attached files:</br>`);
    }
    // ───────────────────────────────────── Files ───────────────────────────────────────────
    // Function of displaying files in a letter
    eel.expose(load_one_files)
    function load_one_files(data) {
        console.log(data)
        const files_message = $('#files_message');
        files_message.append(
            `</br>filename: ${data["Filename"]}</br>
                              Content type: ${data["contentType"]}</br>
                              Size: ${data["size"]} byte</br></br>
                              <button id="${data["filename"]}" class="donwload_file">Download file</button></br>`
        );
    }
    // File download function
    $(document).on("click", ".donwload_file", async function (e) {
        e.preventDefault();
        var id = $(this).attr('id');
        console.log(id)
        await eel.loading_attachments(id)
    });
    // ───────────────────────────────────── Modal window ───────────────────────────────────────────
    // Closing a modal window with a cross
    $('.modal__close-button').click(function (e) {
        e.preventDefault();
        $('.modal').removeClass('modal_active');
        $('body').removeClass('hidden');
    });
    // Close on click outside modal window
    $('.modal').mouseup(function (e) {
        let modalContent = $(".modal__content");
        if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
            $(this).removeClass('modal_active');
            $('body').removeClass('hidden');
        }
    });
    // ─────────────────────────────────────────── Other ───────────────────────────────────────────────────
    // Function to update API connection data and get valid mail
    eel.expose(update_stats)
    function update_stats(api_status, activ_mail) {
        $('#api_conection').html(`API connection: ${api_status}`);
        $('#activ_mail').html(`Your mail: ${activ_mail}`);
    }

    // Just exit the app
    $("#exit_btn").click(async function () {
        await eel.exit()
    })

    // Creates a new mail
    $("#new_email").click(async function () {
        await eel.start()
    })

    }
)
