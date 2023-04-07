from pydantic import BaseModel, Field, validator,PositiveInt
from pydantic.utils import GetterDict
from datetime import date
from typing import Any
# from typing import List


##### Teacher Schemas Start #####
class teacher_schema(BaseModel):
    id : int
    firstname : str
    lastname : str
    email : str
    hashpassword : str
    department : str
    sex : str
    phone : PositiveInt
    adress : str
    DOB : date
    appointed : date
    
    class Config():
        orm_mode = True
    
class teacherattendance_schema(BaseModel):
    regno : int
    department : str
    ondate : date
    present : bool
    teacher_id : int
    
    class Config():
        orm_mode = True
        
class teacherissues_schema(BaseModel):
    issue_id : int
    issue : str
    type : str
    teacher_id : int
    
    class Config():
        orm_mode = True
        
        
class teacherleaves_schema(BaseModel):
    leave_id : int
    reason : str
    no_of_days : int
    teacher_id : int
    
    class Config():
        orm_mode = True

class teachersalary_schema(BaseModel):
    salary_id : int
    total_salary : float
    PF : float
    paid : bool
    teacher_id : int
    
    class Config():
        orm_mode = True
           
# class studentresults_schema(BaseModel):
#     results_id : str
#     grade : str
#     marks:int
#     student_id : int
    
#     class Config():
#         orm_mode = True

##### Teacher Schemas End #####

##### Response Models Start #####

class only_tattendence(BaseModel):
    ondate:date
    present:bool
    
    class Config():
        orm_mode = True
        
class only_tissue(BaseModel):
    issue : str
    
    class Config():
        orm_mode = True
        
        
class only_tleave(BaseModel):
    reason:str
    no_of_days:int
    
    class Config():
        orm_mode = True
    
class only_salary(BaseModel):
    total_salary : float
    PF : float
    paid : bool
    
    class Config():
        orm_mode = True

class showTeacher(BaseModel):
    id : int 
    firstname : str
    email : str
    teachattendence : list[only_tattendence]
    teachissues : list[only_tissue]
    teachleaves : list[only_tleave]
    teachsalary : list[only_salary]
    # sturesults : list[only_result]
    
    class Config():
        orm_mode = True
        # getter_dict = UserGetter
        
class showAllDataOfTeacher(BaseModel):
    id : int
    firstname : str
    lastname : str
    email : str
    hashpassword : str
    department : str
    sex : str
    phone : PositiveInt
    adress : str
    DOB : date
    appointed : date
    teachattendence : list[teacherattendance_schema]
    teachissues : list[teacherissues_schema]
    teachleaves : list[teacherleaves_schema]
    teachsalary : list[teachersalary_schema]
    # sturesults : list[studentresults_schema]
    
    class Config():
        orm_mode = True
        
# class showStudentInfo(BaseModel):
#     standard : str
#     section : str
#     DOB : str
#     DOJ : str
#     feedue : float
#     grade : str
#     attendence : float
#     student_id : int
    
#     class Config():
#         orm_mode = True

# class only_result(BaseModel):
#     grade : str
    
#     class Config():
#         orm_mode = True

##### Response Models End #####

 
