from fastapi.security import OAuth2PasswordRequestForm
from fastapi import FastAPI,Depends,HTTPException,Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta
from database import engine
import services as sv
import schemas as sc
from jose import jwt
import uvicorn
import requests
import models

app = FastAPI()

origins = [
           "http://127.0.0.1:3000",
           "http://127.0.0.1:3000/register",
           "http://127.0.0.1:8001",
           "http://127.0.0.1:8000",
           "http://127.0.0.1:8002",
           "http://127.0.0.1:8002/",
           "http://localhost:3000",
           ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

##### Login Form Start #####
@app.post('/token',tags=['Login Form'])
def login_form(form_data:OAuth2PasswordRequestForm=Depends(),db:Session=Depends(sv.get_db)):
    user = sv.user_authenticate(form_data.username,form_data.password,db=db)
    if not user:
        raise HTTPException(
            status_code=404,
            detail='user not found'
        )
    token_expire = timedelta(minutes=60)
    token = sv.gen_token(user.email,user.id,expire_delta=token_expire)
    return {
       "access_token":token,
       "token_type":"bearer"
    }
##### Login Form End #####

##### JWT Decode Function Starts #####
@app.post('/token/decoder', tags=['Login Form'])
async def get_current_user(db:Session=Depends(sv.get_db),token: str = Depends(sv.outh2_barrer)):
    try:
        payload = jwt.decode(token, sv.SECRET_KEY, algorithms=sv.ALGORITHAM)
        id = payload.get("usrId")
        user = db.query(models.Teacher).get(id)
    except:
        raise HTTPException(
            status_code=401,
            detail="teacher credentials not found"
        )
    return sc.showAllDataOfTeacher.from_orm(user)
##### JWT Decode Function Ends ##### 

##### Teacher CURD Operations Start #####
@app.get('/',tags=['Teacher'], response_model=sc.showTeacher)
def get_Teacher(u:sc.showTeacher=Depends(sv.get_current_user)):
    return u

@app.get('/allinstructers', tags=['Teacher'])
def get_allinstructers(db:Session=Depends(sv.get_db)):
    aim = db.query(models.Teacher).all()
    return aim

@app.post('/create', tags=['Teacher'])
def create_Teacher(s:sc.teacher_schema, db:Session=Depends(sv.get_db)):
    hashed_password = sv.hash_password(s.hashpassword)
    cs = models.Teacher(firstname = s.firstname, lastname = s.lastname, email = s.email, hashpassword = hashed_password,
                        sex = s.sex, adress = s.adress, phone = s.phone, department = s.department,
                        DOB = s.DOB, appointed = s.appointed)
    db.add(cs)
    db.commit()
    db.refresh(cs)
    user = db.query(models.Teacher).filter(models.Teacher.email==s.email).first()
    token=sv.gen_token(email=user.email,usrId=user.id)
    return {
       "access_token":token,
       "token_type":"bearer"
    }
    
@app.put('/update/{id}', tags=['Teacher'])
def update_Teacher(id:int,s:sc.teacher_schema, db:Session=Depends(sv.get_db)):
    hashed_password = sv.hash_password(s.hashpassword)
    db.query(models.Teacher).filter(models.Teacher.id == id)\
    .update({'firstname':s.firstname, 'lastname':s.lastname, 'email':s.email,
             'hashpassword':hashed_password, 'sex' : s.sex, 'adress' : s.adress,
             'phone' : s.phone, 'department' : s.department, 'DOB' : s.DOB, 'appointed' : s.appointed },
            synchronize_session=False)
    db.commit()
    return {
        'status' : 'Teacher updated successfully'
    }
    
@app.delete('/delete/{id}', tags=['Teacher'])
def delete_Teacher(id:int, db:Session=Depends(sv.get_db)):
    db.query(models.Teacher).filter(models.Teacher.id == id).delete(synchronize_session=False)
    db.commit()
    return {
        'status' : 'Teacher deleted successfully'
    }
    
### all students backend connection starts ###
@app.get('/teacher/allstudents', tags=['Students'])
async def get_all_students():
    req = requests.get("http://127.0.0.1:8000/allstudents")
    return req.json()
### all students backend connection ends ###

##### Teacher CURD Operations End #####

##### TeacherAttendence CURD Operations Start #####
@app.get('/teacher/attendance',tags=['Teacher Attendance'],response_model=sc.teacherattendance_schema)
def get_TeacherAttendance(u:dict=Depends(sv.get_current_user), db:Session=Depends(sv.get_db)):
    sim = db.query(models.TeacherAttendence).filter(models.TeacherAttendence.teacher_id == u.id).first()
    return sim

@app.post('/teacher/attendance',tags=['Teacher Attendance'])
def create_info(s:sc.teacherattendance_schema,db:Session=Depends(sv.get_db)):
    cim = models.TeacherAttendence(regno=s.regno,department=s.department,
                                   ondate=s.ondate, present=s.present,
                                   teacher_id=s.teacher_id, )
    db.add(cim)
    db.commit()
    db.refresh(cim)
    return {
        'status' : 'Teacher attendence created successfully'
    }
##### TeacherAttendance CURD Operations End #####

##### TeacherIssues CURD Operations Start #####
@app.get('/teacher/issues',tags=['Teacher Issues'],response_model=sc.teacherissues_schema)
def get_TeacherIssues(u:dict=Depends(sv.get_current_user), db:Session=Depends(sv.get_db)):
    sim = db.query(models.TeacherIssues).filter(models.TeacherIssues.teacher_id == u.id).first()
    return sim

@app.post('/teacher/issues',tags=['Teacher Issues'])
def create_tinfo(s:sc.teacherissues_schema,db:Session=Depends(sv.get_db)):
    cim = models.TeacherIssues( issue_id=s.issue_id, issue=s.issue, type=s.type,
                                   teacher_id=s.teacher_id)
    db.add(cim)
    db.commit()
    db.refresh(cim)
    return {
        'status' : 'Teacher issue created successfully'
    }
##### TeacherIssues CURD Operations End #####

##### TeacherResults CURD Operations Start #####
# @app.get('/Teacher/results',tags=['Teacher Results'],response_model=sc.Teacherresults_schema)
# def get_TeacherResults(u:dict=Depends(sv.get_current_user), db:Session=Depends(sv.get_db)):
#     sim = db.query(models.TeacherResults).filter(models.TeacherResults.Teacher_id == u.id).first()
#     return sim

# @app.post('/Teacher/results',tags=['Teacher Results'])
# def create_results(s:sc.Teacherresults_schema,db:Session=Depends(sv.get_db)):
#     cim = models.TeacherResults( results_id=s.results_id, grade=s.grade,marks=s.marks, Teacher_id=s.Teacher_id)
#     db.add(cim)
#     db.commit()
#     db.refresh(cim)
#     return {
#         'status' : 'Teacher result created successfully'
#     }
##### TeacherResults CURD Operations End #####

##### TeacherLeaves CURD Operations Start #####
@app.get('/teacher/leaves',tags=['Teacher Leaves'],response_model=sc.teacherleaves_schema)
def get_TeacherLeaves(u:dict=Depends(sv.get_current_user), db:Session=Depends(sv.get_db)):
    sim = db.query(models.TeacherLeaves).filter(models.TeacherLeaves.teacher_id == u.id).first()
    return sim

@app.post('/teacher/leaves',tags=['Teacher Leaves'])
def create_results(s:sc.teacherleaves_schema,db:Session=Depends(sv.get_db)):
    cim = models.TeacherLeaves( leave_id=s.leave_id, reason=s.reason, 
                               no_of_days=s.no_of_days,teacher_id=s.teacher_id)
    db.add(cim)
    db.commit()
    db.refresh(cim)
    return {
        'status' : 'Teacher leave created successfully'
    }
##### TeacherLeaves CURD Operations End #####

##### TeacherSalary CURD Operations Start #####
@app.get('/teacher/fees',tags=['Teacher Salary'],response_model=sc.teachersalary_schema)
def get_TeacherFees(u:dict=Depends(sv.get_current_user), db:Session=Depends(sv.get_db)):
    sim = db.query(models.TeacherSalary).filter(models.TeacherSalary.teacher_id == u.id).first()
    return sim

@app.post('/Teacher/fees',tags=['Teacher Salary'])
def create_Fees(s:sc.teachersalary_schema,db:Session=Depends(sv.get_db)):
    cim = models.TeacherSalary( salary_id=s.salary_id, total_salary=s.total_salary, 
                               PF=s.PF,paid=s.paid,teacher_id=s.teacher_id)
    db.add(cim)
    db.commit()
    db.refresh(cim)
    return {
        'status' : 'Teacher salary created successfully'
    }
##### TeacherSalary CURD Operations End #####

##### Test Start #####
@app.get('/govinda', tags=['Testing'])
def Govinda():
    return {"Jai Muruga"}
    
##### Test End #####

##### Server #####
if __name__ == "__main__":
    # uvicorn.run(app, host="0.0.0.0", port=8000)
    uvicorn.run("main:app", host="127.0.0.1", port=8002, reload=True)
##### Server #####  
