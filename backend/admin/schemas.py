from pydantic import BaseModel, Field, validator,PositiveInt
from pydantic.utils import GetterDict
from datetime import date
from typing import Any
# from typing import List


##### Student Schemas Start #####
class admin_schema(BaseModel):
    id : int
    firstname : str
    lastname : str
    email : str
    hashpassword : str
    sex : str
    phone : PositiveInt
    appointed : date
    
    class Config():
        orm_mode = True

##### Student Schemas End #####

##### Response Models Start #####

class showAdmin(BaseModel):
    id : int
    firstname : str
    email : str
    appointed : date
    
    class Config():
        orm_mode = True

##### Response Models End #####

 
