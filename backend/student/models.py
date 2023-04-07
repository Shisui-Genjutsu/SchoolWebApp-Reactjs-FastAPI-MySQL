from sqlalchemy import Column,Integer,VARCHAR,ForeignKey,BigInteger,Date,Boolean,Uuid,Float
from sqlalchemy.orm import relationship
from database import Base
import datetime 
from uuid import uuid4

class Student(Base):
    __tablename__ = 'student'
    
    id = Column(Integer,primary_key=True,index=True)
    firstname =  Column(VARCHAR(100))
    lastname = Column(VARCHAR(100))
    email = Column(VARCHAR(200))
    hashpassword = Column(VARCHAR(300))
    sex = Column(VARCHAR(30))
    adress = Column(VARCHAR(300))
    phone = Column(BigInteger())
    parentname = Column(VARCHAR(100))
    DOB = Column(Date, default=datetime.datetime.now())
    DOJ = Column(Date, default=datetime.datetime.now())
    
    
    stuattendence = relationship('StudentAttendence',back_populates='stu')
    stuissues = relationship('StudentIssues',back_populates='stu')
    sturesults = relationship('StudentResults',back_populates='stu')
    stuleaves = relationship('StudentLeaves',back_populates='stu')
    stufees = relationship('StudentFees',back_populates='stu')
    
    
class StudentAttendence(Base):
    __tablename__ = "studentAttendance"
    
    regno = Column(Integer,primary_key=True,index=True)
    standard = Column(VARCHAR(30))
    section = Column(VARCHAR(30))
    ondate = Column(Date, default=datetime.datetime.now())
    present = Column(Boolean(), default=True)
    student_id = Column(Integer, ForeignKey('student.id'))
    
    
    stu = relationship('Student', back_populates='stuattendence')
    
    
class StudentIssues(Base):
    __tablename__ = "studentIssues"
    
    issue_id = Column(VARCHAR(36),primary_key=True, default=uuid4,index=True)
    issue = Column(VARCHAR(300))
    type = Column(VARCHAR(100))
    student_id = Column(Integer, ForeignKey('student.id'))
    
    stu = relationship('Student', back_populates='stuissues') 
    
class StudentResults(Base):
    __tablename__ = "studentResults"
    
    results_id = Column(VARCHAR(36),primary_key=True, default=uuid4, index=True)
    grade = Column(VARCHAR(30))
    marks = Column(Integer())
    student_id = Column(Integer, ForeignKey('student.id'))
    
    stu = relationship('Student', back_populates='sturesults')
    
class StudentLeaves(Base):
    __tablename__ = "studentLeaves"
    
    leave_id = Column(VARCHAR(36),primary_key=True, default=uuid4, index=True)
    reason = Column(VARCHAR(300))
    no_of_days = Column(Integer(), default=1)
    student_id = Column(Integer, ForeignKey('student.id'))
    
    stu = relationship('Student', back_populates='stuleaves')
    
class StudentFees(Base):
    __tablename__ = "studentfees"
    
    fee_id = Column(VARCHAR(100),primary_key=True,index=True)
    total_fee = Column(Float(30), default=30000)
    fee_due = Column(Float(30))
    paid = Column(Boolean(), default=False)
    student_id = Column(Integer, ForeignKey('student.id'))
    
    stu = relationship('Student', back_populates='stufees')
    
class StudentCourses(Base):
    __tablename__ = "studentcourses"
    
    courseid = Column(Integer(), primary_key=True, index=True)
    coursename = Column(VARCHAR(300))
    subject = Column(VARCHAR(300))
    totalhours = Column(Integer())
    available = Column(Boolean, default=True)
    


    
    