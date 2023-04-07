from sqlalchemy import Column,Integer,VARCHAR,ForeignKey,BigInteger,Date,Boolean,Float
from sqlalchemy.orm import relationship
from database import Base
import datetime 

class Admin(Base):
    __tablename__="admin"
    
    id = Column(Integer(),primary_key=True, index=True)
    firstname = Column(VARCHAR(300))
    lastname = Column(VARCHAR(300))
    email = Column(VARCHAR(300))
    hashpassword = Column(VARCHAR(300))
    sex = Column(VARCHAR(300))
    phone = Column(BigInteger())
    appointed = Column(Date, default=datetime.datetime.now()) 