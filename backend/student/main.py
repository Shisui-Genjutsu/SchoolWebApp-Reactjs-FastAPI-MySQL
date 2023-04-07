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
import models

app = FastAPI()

origins = [
           "http://127.0.0.1:3000",
           "http://127.0.0.1:3000/register",
           "http://127.0.0.1:8000/student/issues",
           "http://127.0.0.1:8000",
           "http://127.0.0.1:8001",
           "http://127.0.0.1:8002",
           "http://127.0.0.1:8000/",
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
        user = db.query(models.Student).get(id)
    except:
        raise HTTPException(
            status_code=401,
            detail="student credentials not found"
        )
    return sc.showAllDataOfUser.from_orm(user)
##### JWT Decode Function Ends ##### 

##### Student CURD Operations Start #####
@app.get('/',tags=['Students'], response_model=sc.showUser)
def get_student(u:sc.showUser=Depends(sv.get_current_user)):
    return u

@app.get("/allstudents", tags=['Students'])
def all_students(db:Session=Depends(sv.get_db)):
    return db.query(models.Student).all()

@app.post('/create', tags=['Students'])
def create_student(s:sc.student_schema, db:Session=Depends(sv.get_db)):
    hashed_password = sv.hash_password(s.hashpassword)
    cs = models.Student(firstname = s.firstname, lastname = s.lastname, email = s.email, hashpassword = hashed_password,
                        sex = s.sex, adress = s.adress, phone = s.phone, parentname = s.parentname,
                        DOB = s.DOB, DOJ = s.DOJ)
    db.add(cs)
    db.commit()
    db.refresh(cs)
    user = db.query(models.Student).filter(models.Student.email==s.email).first()
    token=sv.gen_token(email=user.email,usrId=user.id)
    return {
       "access_token":token,
       "token_type":"bearer"
    }
    
@app.put('/update/{id}', tags=['Students'])
def update_student(id:int,s:sc.student_schema, db:Session=Depends(sv.get_db)):
    hashed_password = sv.hash_password(s.hashpassword)
    db.query(models.Student).filter(models.Student.id == id)\
    .update({'firstname':s.firstname, 'lastname':s.lastname, 'email':s.email,
             'hashpassword':hashed_password, 'sex' : s.sex, 'adress' : s.adress,
             'phone' : s.phone, 'parentname' : s.parentname, 'DOB' : s.DOB, 'DOJ' : s.DOJ },
            synchronize_session=False)
    db.commit()
    return {
        'status' : 'student updated successfully'
    }
    
@app.delete('/delete/{id}', tags=['Students'])
def delete_student(id:int, db:Session=Depends(sv.get_db)):
    db.query(models.Student).filter(models.Student.id == id).delete(synchronize_session=False)
    db.commit()
    return {
        'status' : 'student deleted successfully'
    }
##### Student CURD Operations End #####

##### StudentAttendence CURD Operations Start #####
@app.get('/student/attendance',tags=['Student Attendance'],response_model=sc.studentattendance_schema)
def get_studentAttendance(u:dict=Depends(sv.get_current_user), db:Session=Depends(sv.get_db)):
    sim = db.query(models.StudentAttendence).filter(models.StudentAttendence.student_id == u.id).first()
    return sim

@app.post('/student/attendance',tags=['Student Attendance'])
def create_info(s:sc.studentattendance_schema,db:Session=Depends(sv.get_db)):
    cim = models.StudentAttendence(standard=s.standard, section=s.section,
                                   ondate=s.ondate, present=s.present,
                                   student_id=s.student_id, )
    db.add(cim)
    db.commit()
    db.refresh(cim)
    return {
        'status' : 'student attendence created successfully'
    }
##### StudentAttendance CURD Operations End #####

##### StudentIssues CURD Operations Start #####
@app.get('/student/issues',tags=['Student Issues'],response_model=sc.studentissues_schema)
def get_studentIssues(u:dict=Depends(sv.get_current_user), db:Session=Depends(sv.get_db)):
    sim = db.query(models.StudentIssues).filter(models.StudentIssues.student_id == u.id).first()
    return sim

@app.post('/student/issues',tags=['Student Issues'])
def create_info(s:sc.studentissues_schema,db:Session=Depends(sv.get_db)):
    cim = models.StudentIssues( issue_id=s.issue_id, issue=s.issue, type=s.type,
                                   student_id=s.student_id)
    db.add(cim)
    db.commit()
    db.refresh(cim)
    return {
        'status' : 'student issue created successfully'
    }
##### StudentIssues CURD Operations End #####

##### StudentResults CURD Operations Start #####
@app.get('/student/results',tags=['Student Results'],response_model=sc.studentresults_schema)
def get_studentResults(u:dict=Depends(sv.get_current_user), db:Session=Depends(sv.get_db)):
    sim = db.query(models.StudentResults).filter(models.StudentResults.student_id == u.id).first()
    return sim

@app.post('/student/results',tags=['Student Results'])
def create_results(s:sc.studentresults_schema,db:Session=Depends(sv.get_db)):
    cim = models.StudentResults( results_id=s.results_id, grade=s.grade,marks=s.marks, student_id=s.student_id)
    db.add(cim)
    db.commit()
    db.refresh(cim)
    return {
        'status' : 'student result created successfully'
    }
##### StudentResults CURD Operations End #####

##### StudentLeaves CURD Operations Start #####
@app.get('/student/leaves',tags=['Student Leaves'],response_model=sc.studentleaves_schema)
def get_studentLeaves(u:dict=Depends(sv.get_current_user), db:Session=Depends(sv.get_db)):
    sim = db.query(models.StudentLeaves).filter(models.StudentLeaves.student_id == u.id).first()
    return sim

@app.post('/student/leaves',tags=['Student Leaves'])
def create_results(s:sc.studentleaves_schema,db:Session=Depends(sv.get_db)):
    cim = models.StudentLeaves( leave_id=s.leave_id, reason=s.reason, 
                               no_of_days=s.no_of_days,student_id=s.student_id)
    db.add(cim)
    db.commit()
    db.refresh(cim)
    return {
        'status' : 'student leave created successfully'
    }
##### StudentLeaves CURD Operations End #####

##### StudentFees CURD Operations Start #####
@app.get('/student/fees',tags=['Student Fees'],response_model=sc.studentfees_schema)
def get_studentFees(u:dict=Depends(sv.get_current_user), db:Session=Depends(sv.get_db)):
    sim = db.query(models.StudentFees).filter(models.StudentFees.student_id == u.id).first()
    return sim

@app.post('/student/fees',tags=['Student Fees'])
def create_Fees(s:sc.studentfees_schema,db:Session=Depends(sv.get_db)):
    cim = models.StudentFees( fee_id=s.fee_id, total_fee=s.total_fee, 
                               fee_due=s.fee_due,student_id=s.student_id)
    db.add(cim)
    db.commit()
    db.refresh(cim)
    return {
        'status' : 'student fee created successfully'
    }
##### StudentFees CURD Operations End #####

##### StudentFees CURD Operations Start #####
@app.get('/student/courses',tags=['Student Courses'])
def get_allstudentFees(db:Session=Depends(sv.get_db)):
    sim = db.query(models.StudentCourses).all()
    return sim

@app.post('/student/courses',tags=['Student Courses'])
def create_Courses(s:sc.studentcourses_schema,db:Session=Depends(sv.get_db)):
    cim = models.StudentCourses( courseid=s.courseid, coursename=s.coursename, 
                               subject=s.subject,totalhours=s.totalhours, available=s.available)
    db.add(cim)
    db.commit()
    db.refresh(cim)
    return {
        'status' : 'student courses created successfully'
    }
##### StudentCourses CURD Operations End #####





##### Test Start #####
@app.get('/govinda', tags=['Testing'])
def Govinda():
    return {"Jai Ayapa"}
    
##### Test End #####

##### Server #####
if __name__ == "__main__":
    # uvicorn.run(app, host="0.0.0.0", port=8000)
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
##### Server #####  
