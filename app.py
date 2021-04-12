from flask import Flask, render_template, flash, redirect, url_for, request
from flask_sqlalchemy import SQLAlchemy 
from flask_socketio import SocketIO, send   
from flask_login import LoginManager, UserMixin, login_user
from werkzeug.security import check_password_hash, generate_password_hash
from forms import SignUpForm, LoginForm
from datetime import datetime 

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dfewfew123213rwdsgert34tgfd1234trgf'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Socket.io  
socketio = SocketIO(app)  
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app) 

class User(UserMixin, db.Model):
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(255), unique=True, nullable=False)
  username = db.Column(db.String(50), unique=True, nullable=False)
  password = db.Column(db.String(500), nullable=False)
  # should I make profile picture?

  def __init__(self, email, username, password):
    self.email = email
    self.username = username
    self.password = password

@login_manager.user_loader  
def load_user(user_id):
  return User.query.get(int(user_id))   

@app.route("/")
def home():
  return render_template("home.html")

@app.route("/login", methods=["GET", "POST"])
def login():
  form = LoginForm()
  if request.method == "POST" and form.validate():

    user = User.query.filter_by(email=form.email.data).first()
    """User' object has no attribute 'check_password_hash WATCH OUT """
    if user and check_password_hash(user.password, form.password.data):
      login_user(user)
      return "You are now logged in!"
    else:
      credentialsError = "Incorrect credentials. Try again."
      return render_template("login.html", form=form, message=credentialsError)
  return render_template("login.html", form=form)

@app.route("/signup", methods=["GET", "POST"])
def signup():
  form = SignUpForm()
  if request.method == "POST" and form.validate():
    hashed_password = generate_password_hash(form.password.data, method="sha256")
    # define new variables 
    email = form.email.data
    username = form.username.data
    # check if username & email already exist in database
    existsUsername = bool(User.query.filter_by(username=form.username.data).first())
    existsEmail = bool(User.query.filter_by(email=form.email.data).first())
    if existsUsername == True:
      return render_template("signup.html", form=form, existsUsernameMessage="This username is taken. Choose a new username!")
    if existsEmail == True:
      return render_template("signup.html", form=form, existsEmailMessage="This email has already been registered. Use another email address.")
    else: 
      new_user = User(email= form.email.data, username=form.username.data, password=hashed_password)
      db.session.add(new_user)
      db.session.commit() 
      return redirect(url_for("login"))
    
  return render_template("signup.html", form=form)

  
@app.after_request
def add_header(r):
  print("[INFO]===> Adding headers...")
  r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
  r.headers["Pragma"] = "no-cache"
  r.headers["Expires"] = "0"
  return r
  
if __name__ == "__main__":
    db.create_all()
    app.run(debug=True, host="0.0.0.0", port=8000)







