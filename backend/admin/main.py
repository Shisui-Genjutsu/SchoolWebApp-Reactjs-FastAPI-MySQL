from fastapi.security import OAuth2PasswordRequestForm
from fastapi import FastAPI,Depends,HTTPException
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
           "http://127.0.0.1:8000",
           "http://127.0.0.1:8002",
           "http://127.0.0.1:8001",
           "http://127.0.0.1:8001/",
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
        user = db.query(models.Admin).get(id)
    except:
        raise HTTPException(
            status_code=401,
            detail="admin credentials not found"
        )
    return sc.admin_schema.from_orm(user)
##### JWT Decode Function Ends ##### 

##### Admin CURD Operations Start #####
@app.get('/',tags=['Admin'], response_model=sc.showAdmin)
def get_admin(u:sc.showAdmin=Depends(sv.get_current_user)):
    return u

@app.post('/create', tags=['Admin'])
def create_Admin(s:sc.admin_schema, db:Session=Depends(sv.get_db)):
    hashed_password = sv.hash_password(s.hashpassword)
    cs = models.Admin(firstname = s.firstname, lastname = s.lastname, email = s.email, hashpassword = hashed_password,
                        sex = s.sex, phone = s.phone, appointed = s.appointed)
    db.add(cs)
    db.commit()
    db.refresh(cs)
    user = db.query(models.Admin).filter(models.Admin.email==s.email).first()
    token=sv.gen_token(email=user.email,usrId=user.id)
    return {
       "access_token":token,
       "token_type":"bearer"
    }
    
@app.put('/update/{id}', tags=['Admin'])
def update_Admin(id:int,s:sc.admin_schema, db:Session=Depends(sv.get_db)):
    hashed_password = sv.hash_password(s.hashpassword)
    db.query(models.Admin).filter(models.Admin.id == id)\
    .update({'firstname':s.firstname, 'lastname':s.lastname, 'email':s.email,
             'hashpassword':hashed_password, 'sex' : s.sex, 'phone' : s.phone, 'appointed' : s.appointed },
            synchronize_session=False)
    db.commit()
    return {
        'status' : 'admin updated successfully'
    }
    
@app.delete('/delete/{id}', tags=['Admin'])
def delete_Admin(id:int, db:Session=Depends(sv.get_db)):
    db.query(models.Admin).filter(models.Admin.id == id).delete(synchronize_session=False)
    db.commit()
    return {
        'status' : 'admin deleted successfully'
    }
##### Admin CURD Operations End #####



##### Test Start #####
@app.get('/govinda', tags=['Testing'])
def Govinda():
    return {"Jai Vinayaka"}
    
##### Test End #####

##### Server #####
if __name__ == "__main__":
    # uvicorn.run(app, host="0.0.0.0", port=8000)
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)
##### Server #####  
