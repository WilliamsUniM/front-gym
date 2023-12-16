from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
from datetime import date
import pytest
import time


driver = webdriver.Firefox()
url = "http://localhost:3000/"
driver.get(url)

@pytest.mark.parametrize(
        "email, password, message",
        [
            ('','','Por favor ingrese su email'),
            ('williams','','ingrese un email valido'),
            ('williams@test.com','','Por favor ingrese su password'),
            ('williams@test.com','12345','El password debe ser mayor a 6 caracteres'),
            ('williams@test.com','123456','email o password invalidos'),
        ]
)
def test_error_login_valid_erros(email, password, message):

    login_email = driver.find_element(By.XPATH, '/html/body/div/div/label[1]/input')
    login_email.send_keys(email)
    time.sleep(1)

    login_password = driver.find_element(By.XPATH, '/html/body/div/div/label[2]/input')
    login_password.send_keys(password)
    time.sleep(1)

    login_button = driver.find_element(By.XPATH, '/html/body/div/div/div/button')
    login_button.click()
    time.sleep(1)

    login_email.clear()
    login_password.clear()

    login_message = driver.find_element(By.XPATH, '/html/body/div/div/label[3]/p')

    assert login_message.text == message

def test_login():
    login_email = driver.find_element(By.XPATH, '/html/body/div/div/label[1]/input')
    login_email.send_keys('williams@test.com')
    time.sleep(1)

    login_password = driver.find_element(By.XPATH, '/html/body/div/div/label[2]/input')
    login_password.send_keys('master')
    time.sleep(1)

    login_button = driver.find_element(By.XPATH, '/html/body/div/div/div/button')
    login_button.click()
    time.sleep(1)

    assert True

def test_valid_home_report():
    select_site = Select(driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[1]/select'))
    select_site.select_by_index(1)
    time.sleep(1)

    select_site.select_by_index(2)
    time.sleep(1)

    driver.find_element(By.XPATH, '//*[@id="react-burger-menu-btn"]').click()
    time.sleep(1)

    driver.find_element(By.XPATH, '/html/body/div/div/div[1]/div[2]/div[3]/div[1]/nav/a[2]').click()
    time.sleep(1)

    assert True

@pytest.mark.parametrize(
        "name, phone, document, email, site, message",
        [
            ('','','','',0,'Debe ingresar todos los campos'),
            ('name','1234567890','8888888','name@email.com',0,'Debe ingresar todos los campos'),
            ('','1234567890','8888888','name@email.com',1,'Debe ingresar todos los campos'),
            ('name','','8888888','name@email.com',1,'Debe ingresar todos los campos'),
            ('name','1234567890','','name@email.com',1,'Debe ingresar todos los campos'),
            ('name','1234567890','8888888','',1,'Debe ingresar todos los campos'),
            ('name','1234567890','8888888','name@email.com',1,'Se guardo coorectamente con el id'),
        ]
)
def test_client_registration(name, phone, document, email, site, message):

    reg_name = driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[1]/label[1]/input')
    reg_name.send_keys(name)
    time.sleep(1)

    reg_phone = driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[1]/label[2]/input')
    reg_phone.send_keys(phone)
    time.sleep(1)
    
    reg_document = driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[1]/label[3]/input')
    reg_document.send_keys(document)
    time.sleep(1)

    reg_email = driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[2]/label[1]/input')
    reg_email.send_keys(email)
    time.sleep(1)

    select_site = Select(driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[2]/label[2]/select'))
    select_site.select_by_index(site)
    time.sleep(1)

    driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[2]/label[3]/button').click()
    time.sleep(1)

    assert message in driver.switch_to.alert.text

    driver.switch_to.alert.accept()
    reg_name.clear()
    reg_phone.clear()
    reg_document.clear()
    reg_email.clear()
    time.sleep(1)

def test_payment_page():
    driver.find_element(By.XPATH, '//*[@id="react-burger-menu-btn"]').click()
    time.sleep(1)

    driver.find_element(By.XPATH, '/html/body/div/div/div[1]/div[2]/div[3]/div[1]/nav/a[3]').click()
    time.sleep(1)

    driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[2]/label[1]/input').clear()
    time.sleep(1)

    assert True

@pytest.mark.parametrize(
    "document, amount, type, message",
    [
        ('','',1,'Debe ingresar todos los campos'),
        ('8888888','12000',0,'Debe ingresar todos los campos'),
        ('','12000',2,'Debe ingresar todos los campos'),
        ('8888888','',3,'Debe ingresar todos los campos'),
        ('8888888','12000',4,'Se guardo coorectamente con el id'),
    ]
)
def test_payment_validation(document, amount, type, message):
    reg_document = driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[1]/label[1]/input')
    reg_document.send_keys(document)
    time.sleep(1)

    reg_amount = driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[2]/label[1]/input')
    reg_amount.send_keys(amount)
    time.sleep(1)

    select_type = Select(driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[1]/label[2]/select'))
    select_type.select_by_index(type)
    time.sleep(1)

    driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[2]/label[2]/button').click()
    time.sleep(1)

    assert message in driver.switch_to.alert.text

    driver.switch_to.alert.accept()
    reg_document.clear()
    reg_amount.clear()
    time.sleep(1)

def test_get_report():
    today = date.today()
    
    driver.find_element(By.XPATH, '//*[@id="react-burger-menu-btn"]').click()
    time.sleep(1)

    driver.find_element(By.XPATH, '/html/body/div/div/div[1]/div[2]/div[3]/div[1]/nav/a[4]').click()
    time.sleep(1)

    select_type = Select(driver.find_element(By.XPATH, '/html/body/div/div/label[1]/select'))
    select_type.select_by_index(1)
    time.sleep(1)

    monthi = driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[1]/label[1]/div/div/div/input[2]')
    monthi.send_keys(today.month)
    time.sleep(1)

    dayi = driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[1]/label[1]/div/div/div/input[3]')
    dayi.send_keys(today.day)
    time.sleep(1)

    yeari = driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[1]/label[1]/div/div/div/input[4]')
    yeari.send_keys(today.year)
    time.sleep(1)
    monthi.send_keys(today.month)

    monthf = driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[2]/label[1]/div/div/div/input[2]')
    monthf.send_keys(today.month)
    time.sleep(1)

    dayf = driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[2]/label[1]/div/div/div/input[3]')
    dayf.send_keys(today.day)
    time.sleep(1)

    yearf = driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[2]/label[1]/div/div/div/input[4]')
    yearf.send_keys(today.year)
    time.sleep(1)
    monthf.send_keys(today.month)

    driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div[1]/label[2]/button').click()
    time.sleep(1)

    name = driver.find_element(By.XPATH, '/html/body/div/div/label[2]/div[1]/div/div/div[2]/div/div[2]/div')
    document = driver.find_element(By.XPATH, '/html/body/div/div/label[2]/div[1]/div/div/div[2]/div/div[3]/div')
    type = driver.find_element(By.XPATH, '/html/body/div/div/label[2]/div[1]/div/div/div[2]/div/div[4]/div')
    amount = driver.find_element(By.XPATH, '/html/body/div/div/label[2]/div[1]/div/div/div[2]/div/div[5]/div')

    assert name.text == 'name'
    assert document.text == '8888888'
    assert type.text == 'ANUAL'
    assert amount.text == '12000'
