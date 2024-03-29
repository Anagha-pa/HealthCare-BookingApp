from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from adminpanel.models import Doctor,Departments




class UserAccountManager(BaseUserManager):
  def create_user(self, first_name, last_name, email, password=None, department=None, experience=None, qualification=None, gender=None, phone_number=None):
    if not email:
      raise ValueError('Users must have an email address')

    email = self.normalize_email(email)
    email = email.lower()

    user = self.model(
      first_name=first_name,
      last_name=last_name,
      email=email,
      department=department,  # Include the 'department' field
      experience=experience,  # Include the 'experience' field
      qualification=qualification,
      gender = gender,
      phone_number = phone_number
      
    )

    user.set_password(password)
    user.save(using=self._db)

    return user
  
  
  def create_superuser(self, first_name, last_name, email, password=None):
    if password is None:
      raise TypeError("Superusers must have a password.")
    
    user = self.create_user(
      first_name,
      last_name,
      email,
      password=password,
    )

    user.is_staff = True
    user.is_superuser = True
    user.save(using=self._db)

    return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
  first_name = models.CharField(max_length=255)
  last_name = models.CharField(max_length=255,null=True,blank=True)
  email = models.EmailField(unique=True, max_length=255)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  otp=models.CharField(max_length=6,null=True,blank=True)
  otp_verified = models.BooleanField(default=False)
  age = models.PositiveIntegerField(null=True, blank=True)
  gender = models.CharField(max_length=6,default="male", null=True, blank=True)
  phone_number = models.CharField(max_length=15, null=True, blank=True)
  address = models.TextField(null=True, blank=True)
  is_doctor = models.BooleanField(default=False)
  qualification = models.CharField(max_length=255,null=True,blank=True)
  experience = models.PositiveIntegerField(null=True,blank=True)
  depart = models.ForeignKey(Departments, on_delete=models.CASCADE, null=True, blank=True)
  department = models.CharField(max_length=225,null=True,blank=True)
  available = models.BooleanField(default=True, null=True, blank=True)
 

  

 
  objects = UserAccountManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['first_name', 'last_name']



# class Appointment(models.Model):
#   first_name = models.CharField(max_length=255, null=True, blank=True)
#   last_name = models.CharField(max_length=255, null=True, blank=True)
#   age = models.PositiveIntegerField(null=True, blank=True)
#   gender = models.CharField(max_length=6,default="male")
#   phone_number = models.CharField(max_length=15, null=True, blank=True)
#   address = models.TextField(null=True, blank=True)
#   department = models.CharField(max_length=255, null=True, blank=True)
#   doctor = models.ForeignKey(UserAccount,on_delete=models.CASCADE,null=True, blank=True)
#   slot_date = models.DateTimeField(null=True,blank=True)
#   payment_status = models.BooleanField(default=False)
#   fee = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
#   user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True, blank=True)
#   time = models.TimeField(default="12:00" , null=True, blank=True )
#   endtime = models.TimeField(default="12:00" , null=True, blank=True )
#   status = models.CharField(max_length=15,null=True, blank=True)
  



#   def __str__(self):
#     return self.first_name
    
class Appointments(models.Model):
  first_name = models.CharField(max_length=255, null=True, blank=True)
  last_name = models.CharField(max_length=255, null=True, blank=True)
  age = models.PositiveIntegerField(null=True, blank=True)
  gender = models.CharField(max_length=6,default="male")
  phone_number = models.CharField(max_length=15, null=True, blank=True)
  address = models.TextField(null=True, blank=True)
  department = models.CharField(max_length=255, null=True, blank=True)
  doctor = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True, blank=True, related_name="doctor_appointments")
  slot_date = models.DateTimeField(null=True,blank=True)
  payment_status = models.BooleanField(default=False)
  fee = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
  user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True, blank=True, related_name="user_appointments")
  time = models.TimeField(default="12:00" , null=True, blank=True )
  endtime = models.TimeField(default="12:00" , null=True, blank=True )
  status = models.CharField(max_length=15,null=True, blank=True)
  



  def __str__(self):
    return self.first_name
  
  # class Meta:
  #       db_table = 'users_appointments'
  

  
class OTP(models.Model):
  otp=models.CharField(max_length=6,null=True,blank=True)
  email = models.EmailField(unique=False, max_length=255)


# class Booking(models.Model):
#   first_name = models.CharField(max_length=255, null=True, blank=True)
#   last_name = models.CharField(max_length=255, null=True, blank=True)
#   age = models.PositiveIntegerField(null=True, blank=True)
#   gender = models.CharField(max_length=6,default="male")
#   phone_number = models.CharField(max_length=15, null=True, blank=True)
#   address = models.TextField(null=True, blank=True)
#   department = models.CharField(max_length=255, null=True, blank=True)
#   doctor = models.ForeignKey(UserAccount,on_delete=models.CASCADE,null=True, blank=True)
#   slot_date = models.DateTimeField(null=True,blank=True)
#   payment_status = models.BooleanField(default=False)
#   fee = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
#   user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True, blank=True, related_name="booked_users")
#   time = models.TimeField(default="12:00" , null=True, blank=True )
#   endtime = models.TimeField(default="12:00" , null=True, blank=True )
#   status = models.CharField(max_length=15,null=True, blank=True)
  
