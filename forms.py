from flask_wtf import FlaskForm, RecaptchaField
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Email, EqualTo

class SignUpForm(FlaskForm):
    username = StringField('Username', validators = [InputRequired()])
    email = StringField('Email', validators = [InputRequired(), Email()])
    password = PasswordField('Password', validators = [InputRequired()])
    confirm_password = PasswordField('Confirm Password', validators = [InputRequired(), EqualTo('password', message='Passwords must match')])
    recaptcha = RecaptchaField()
    submit = SubmitField('Submit')

class LoginForm(FlaskForm):
    email = StringField("Email", validators = [InputRequired(), Email()])
    password = PasswordField("Password", validators = [InputRequired(), EqualTo('password')])
    submit = SubmitField("Login")