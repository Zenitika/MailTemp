import time
import requests
import json
import random
import eel
import os
from dataclasses import dataclass


@dataclass
class MainData:
    login = str
    domain = str
    file_name = str
    ready_email = str
    message_number = int

@eel.expose
def exit():
    """It closes the program."""

    os.system("taskkill /im chrome.exe")

@eel.expose
def start():
    """
    It checks if the connection with the API is established, if it is, it takes a random email from the
    list and splits it into login and domain, then it sends the data to the JS function update_stats

    """
    action = check_connection_with_api()
    if action == True:
        MainData.ready_email = create_multiple_emails()
        email = random.choice(MainData.ready_email)
        MainData.login, MainData.domain = email.split("@")
        eel.update_stats("Connected", email)
    else:
        eel.update_stats("Error", "")

def check_connection_with_api() -> bool:
    """
    It checks if the connection to the API is successful
    :return: True or False

    """
    try:
        connection = requests.get("https://www.1secmail.com/api/v1/")
        if connection.status_code == 200:
            return True
    except Exception as error:
        return False

def create_multiple_emails() -> json:
    """
    It returns a list of 10 random email addresses
    :return: A list of 10 emails.

    """
    mail_list = requests.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10")
    return json.loads(mail_list.text)

@eel.expose
def loading_attachments(file_name):
    """
    It downloads the attachment from the email and saves it to the same directory as the script
    :param file_name: The name of the file that you want to download

    """
    MainData.file_name = file_name
    reply = requests.get(f"https://www.1secmail.com/api/v1/?action=download&login={MainData.login}&domain={MainData.domain}&id={MainData.message_number}&file={MainData.file_name}")
    with open(MainData.file_name, "wb") as code:
        code.write(reply.content)

@eel.expose
def receiving_one_message(message_number):
    """
    It gets the message number from the JS side, then it gets the message data from the 1secmail API,
    then it sends the message data to the JS side, then it checks if there are any attachments, and if
    there are, it sends the attachment data to the JS side.
    :param message_number: The number of the message you want to receive

    """
    MainData.message_number = message_number
    reply = requests.get(f"https://www.1secmail.com/api/v1/?action=readMessage&login={MainData.login}&domain={MainData.domain}&id={MainData.message_number}")
    file_data = json.loads(reply.text)
    eel.load_one_message(json.loads(reply.text))
    if file_data["attachments"] != []:
        for files in file_data["attachments"]:
            eel.load_one_files(files)

@eel.expose
def mailbox_check():
    """
    It checks the mailbox for new messages and sends them to the frontend

    """
    reply = requests.get(f"https://www.1secmail.com/api/v1/?action=getMessages&login={MainData.login}&domain={MainData.domain}")
    if reply.text != "[]":
        for _ in json.loads(reply.text)[::-1]:
            eel.mailbox_update([_])
            time.sleep(0.5)

if __name__ == "__main__":
    """
    It starts the web server and opens the main.html page in fullscreen mode

    """
    eel.init(f'{os.path.dirname(os.path.realpath(__file__))}/web')
    try:
        eel.start('index.html',
                   mode='chrome',
                   port=9011,
                   cmdline_args=['--start-fullscreen', '--disable-extensions'])
    except EnvironmentError:
        eel.start('index.html',
                   mode='default',
                   port=9011,)
