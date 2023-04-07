from pydantic import BaseModel, Field, validator,PositiveInt
from pydantic.utils import GetterDict
from datetime import date
from typing import Any
# from typing import List

class UserGetter(GetterDict):
    def get(self, key: str, default: Any) -> Any:
        if key == "stuattendence":
            # Use self._obj, which is the orm model to build the list of apps_ids and return that
            pass
        return super().get(key, default)

##### Student Schemas Start #####
class student_schema(BaseModel):
    firstname : str
    lastname : str
    email : str
    hashpassword : str
    sex : str
    adress : str
    phone : int
    parentname : str
    DOB : date
    DOJ : date
    
    class Config():
        orm_mode = True

class student_schema1(BaseModel):
    firstname : str
    lastname : str
    email : str
    hashpassword : str
    
    class Config():
        orm_mode = True

    
class studentattendance_schema(BaseModel):
    regno : int
    standard : str
    section : str
    ondate : date
    present : bool
    student_id : int
    
    
    # @validator('ondate', pre=True)
    # def parse_ondate(cls, v):
    #     if isinstance(v, str):
    #         return datetime.strptime(
    #             v,"%d/%m/%Y"
    #             ).date() # maybe needs try/except
    #     return v
    class Config():
        orm_mode = True
        
class studentissues_schema(BaseModel):
    issue_id : str
    issue : str
    type : str
    student_id : int
    
    class Config():
        orm_mode = True
        
class studentresults_schema(BaseModel):
    results_id : str
    grade : str
    marks:int
    student_id : int
    
    class Config():
        orm_mode = True
        
class studentleaves_schema(BaseModel):
    leave_id : str
    reason : str
    no_of_days : int
    student_id : int
    
    class Config():
        orm_mode = True

class studentfees_schema(BaseModel):
    fee_id : str
    total_fee : float
    fee_due : float
    paid : bool = Field(default=False)
    student_id : int
    
    class Config():
        orm_mode = True
        
class studentcourses_schema(BaseModel):
    courseid : int
    coursename : str
    subject : str
    totalhours : int
    available  : bool
    
    class Config():
        orm_mode = True
        

##### Student Schemas End #####

##### Response Models Start #####

class only_attendence(BaseModel):
    ondate:date
    present:bool
    
    class Config():
        orm_mode = True
        
class only_issue(BaseModel):
    issue : str
    
    class Config():
        orm_mode = True
        
class only_result(BaseModel):
    grade : str
    
    class Config():
        orm_mode = True
        
class only_leave(BaseModel):
    reason:str
    no_of_days:int
    
    class Config():
        orm_mode = True
    
class only_fee(BaseModel):
    total_fee : float
    fee_due : float
    paid : bool
    
    class Config():
        orm_mode = True

class showUser(BaseModel):
    id : int 
    firstname : str
    email : str
    stuattendence : list[only_attendence]
    stuissues : list[only_issue]
    sturesults : list[only_result]
    stuleaves : list[only_leave]
    stufees : list[only_fee]
    
    class Config():
        orm_mode = True
        getter_dict = UserGetter
        
class showAllDataOfUser(BaseModel):
    firstname : str
    lastname : str
    email : str
    hashpassword : str
    sex : str
    adress : str
    phone : PositiveInt
    parentname : str
    DOB : date
    DOJ : date
    stuattendence : list[studentattendance_schema]
    stuissues : list[studentissues_schema]
    sturesults : list[studentresults_schema]
    stuleaves : list[studentleaves_schema]
    stufees : list[studentfees_schema]
    
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

##### Response Models End #####

 
