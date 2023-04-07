import React, {useState, useContext, createContext} from 'react';
import './App.css';
import { LoginPage } from './pages/LoginPage';
import { TeacherLoginPage } from './pages/TeacherLoginPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { Routes, Route, NavLink ,useLocation} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { RegistrationPage } from './pages/RegistrationPage';
import { UserContext} from './context/UserContext';
import { DasboardPage } from './pages/DashboardPage';
// import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { SideBarPage } from './pages/SideBarPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AttendancePage } from './pages/AttendancePage';
import { MarksPage } from "./pages/MarksPage"; 
import { ComplaintsPage } from "./pages/ComplaintsPage";
import { LeavePage } from './pages/LevaePage';
import { FeePage } from "./pages/FeePage";
import { TestDocumentPage } from './pages/TestDocumentPage';
import { InstructersPage } from './pages/InstructersPage';
import { CoursesPage } from './pages/CoursesPage';
import { HomePage } from './pages/HomePage';
import { TeacherDashboardPage } from './pages/TeacherDashboardPage';
import { TeacherSideBarPage } from './pages/TeacherSidebarPage';
import { TStatusPage } from './subpages/TStatusPage';
import { TAttendancePage } from './subpages/TattendancePage';
import { TSalaryPage } from './subpages/SalaryPage';
import { TComplaintsPage } from './subpages/TComplaintsPage';
import { TLeavePage } from './subpages/TLeavePage';
import { AssaignMarksPage } from './subpages/AssaignMarksPage';
import { AllStudentsPage } from './pages/AllStudentsPage';

export const Iopen = createContext()
function App() {
    const location = useLocation();
    const [token, settoken] = useContext(UserContext)
    const[ttoken, setttoken] = useState(localStorage.getItem("teacherToken"));
    const[adtoken, setadtoken] = useState(localStorage.getItem("adminToken"));
    const handleLogout = () =>{
        return(settoken(null))
    }
    const handletLogout = () =>{
        return(setttoken(null))
    }
    const handleadLogout = () =>{
        return(setadtoken(null))
    }
    const [isOpen, setIsOpen] = useState(false)
    const toggle = ()=>{setIsOpen(!isOpen)}
    const [stoggle, setsToggle] = useState(true)
    const [ttoggle, settToggle] = useState(false)
    const [atoggle, setaToggle] = useState(false)
  return (
          <>
            <Iopen.Provider value={[isOpen,setIsOpen]}>
            {/* student */}
        <header>
            {stoggle?
                    <nav className='nav'>
                        <div className="logo">
                            <ul className="logolinks">
                                <li className='me-auto'>
                                    <span style={{background: '#FBFAF5',borderRadius: '9px'}} className='px-2 py-1 shadow border border-1' onClick={toggle}><img src='assets/images/icons8-menu-30.png' width={25} alt='hamburger'/></span> 
                                    <SideBarPage />
                                    </li>
                                <li className='ms-5'><img style={{width:"100px",verticalAlign:"middle"}} src="assets/images/stldgitlal-logo.png" alt='stllogo'/></li>
                            </ul>
                        </div>
                        <div className="navopts">
                            <ul className="navlinks">
                                <li><NavLink className='routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'violet'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/">Home</NavLink></li>
                                <li><NavLink className='routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'violet'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/dashboard">Dashboard</NavLink></li>
                                <li><NavLink className='routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'violet'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/instructers">Instructers</NavLink></li>
                                <li><NavLink className='routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'violet'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/courses">courses</NavLink></li>
                            </ul>
                        </div>
                        <div className="registration">
                            <ul className="reglinks">
                                {/* <li><NavLink className='routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'blue'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/signin">Sign In</NavLink></li> */}
                                <li>{token && (<button onClick={handleLogout} className='btn btn-sm btn-outline-light active'>Logout</button>)}</li>
                            </ul>
                        </div>
                    </nav>
                    :null}

                          
                {/* student */}
                {/* teacher */}
                    {ttoggle?
                    <nav className='nav'>
                        <div className="logo">
                            <ul className="logolinks">
                                <li className='me-auto'>
                                    <span style={{background: '#FBFAF5',borderRadius: '9px'}} className='px-2 py-1 shadow border border-1' onClick={toggle}><img src='assets/images/icons8-menu-30.png' width={25} alt='hamburger'/></span> 
                                    <TeacherSideBarPage />
                                    </li>
                                <li className='ms-5'><img style={{width:"100px",verticalAlign:"middle"}} src="assets/images/stldgitlal-logo.png" alt='stllogo'/></li>
                            </ul>
                        </div>
                        <div className="navopts">
                            <ul className="navlinks">
                                <li><NavLink className='routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'violet'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/">Home</NavLink></li>
                                <li><NavLink className='routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'violet'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/tdashboard">Dashboard</NavLink></li>
                                <li><NavLink className='routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'violet'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/allstudents">Students</NavLink></li>
                                <li><NavLink className='routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'violet'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/courses">courses</NavLink></li>
                            </ul>
                        </div>
                        <div className="registration">
                            <ul className="reglinks">
                                {/* <li><NavLink className='routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'blue'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/signin">Sign In</NavLink></li> */}
                                {/* <li><Link className='routelinks' style={{ textDecoration: 'none', color:'#8a2435' }} to="/register">Register</Link></li> */}
                                <li>{ttoken && (<button onClick={handletLogout} className='btn btn-sm btn-outline-light active'>Logout</button>)}</li>
                            </ul>
                        </div>
                    </nav>
                    :null}
                {/* teacher */}
                {/* admin */}
                    {atoggle?
                    <nav className='nav'>
                        <div className="logo">
                            <ul className="logolinks">
                                <li className='me-auto'>
                                    <span style={{background: '#FBFAF5',borderRadius: '9px'}} className='px-2 py-1 shadow border border-1' onClick={toggle}><img src='assets/images/icons8-menu-30.png' width={25} alt='hamburger'/></span> 
                                    <span className='' style={{marginRight:"50px"}}><SideBarPage /></span>
                                    </li>
                                <li className='ms-5'><img style={{width:"100px",verticalAlign:"middle"}} src="assets/images/stldgitlal-logo.png" alt='stllogo'/></li>
                            </ul>
                        </div>
                        <div className="navopts">
                            <ul className="navlinks">
                                <li><NavLink className='routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'violet'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/">Home</NavLink></li>
                                <li><NavLink className='routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'violet'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/dashboard">Dashboard</NavLink></li>
                                <li><NavLink className='routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'violet'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/instructers">family</NavLink></li>
                                <li><NavLink className='routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'violet'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/courses">courses</NavLink></li>
                            </ul>
                        </div>
                        <div className="registration">
                            <ul className="reglinks">
                                {/* <li><NavLink className='routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'blue'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/signin">Sign In</NavLink></li> */}
                                {/* <li><Link className='routelinks' style={{ textDecoration: 'none', color:'#8a2435' }} to="/register">Register</Link></li> */}
                                <li>
                                {adtoken && (<button onClick={handleadLogout} className='btn btn-sm btn-outline-light active'>Logout</button>)}
                                </li>
                            </ul>
                        </div>
                    </nav>
                    :null}
                    <ul className='dropdownul'>
                            <li>
                                <div class="dropdown" style={{margin:"0px 20px"}}>
                                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Login
                                    </button>
                                    <div class="dropdown-menu">
                                        <li><NavLink
                                        onClick={()=>{
                                            return(
                                              setsToggle(true),
                                              settToggle(false),
                                              setaToggle(false)
                                            )}} className='dropdown-item routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'white', background:'blue', borderRadius:'10px'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/studentsignin">Student Sign In</NavLink></li>
                                        <li><NavLink
                                        onClick={()=>{
                                            return(
                                              setsToggle(false),
                                              settToggle(true),
                                              setaToggle(false)
                                            )}} className='dropdown-item routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'white', background:'blue', borderRadius:'10px'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/teachersignin">Teacher Sign In</NavLink></li>
                                        <li><NavLink
                                        onClick={()=>{
                                            return(
                                              setsToggle(false),
                                              settToggle(false),
                                              setaToggle(true)
                                            )}} className='dropdown-item routelinks' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'white', background:'blue', borderRadius:'10px'}:{ textDecoration: 'none', color:'#8a2435' }}} to="/adminsignin">Admin Sign In</NavLink></li>
                                    </div>
                                    </div>
                                </li>
                    </ul>
        </header>
                {/* admin */}
                
                <AnimatePresence>
                    <Routes key={location.pathname} location={location}>
                        <Route path='/' element={<HomePage/>}></Route>
                        <Route path='/dashboard' element={<DasboardPage/>}></Route>
                        <Route path='/instructers' element={<InstructersPage/>}></Route>
                        <Route path='/courses' element={<CoursesPage/>}></Route>
                        <Route path='/studentsignin' element={<LoginPage/>}></Route>
                        <Route path='/teachersignin' element={<TeacherLoginPage/>}></Route>
                        <Route path='/adminsignin' element={<AdminLoginPage/>}></Route>
                        <Route path='/register' element={<RegistrationPage/>}></Route>
                        <Route to="*" element=""></Route>
                        <Route path="/status" element={<AnalyticsPage/>} />
                        <Route path="/attendance" element={<AttendancePage/>} />
                        <Route path="/marks" element={<MarksPage/>} />
                        <Route path="/feedues" element={<FeePage/>} />
                        <Route path="/complaints" element={<ComplaintsPage/>} />
                        <Route path="/leave" element={<LeavePage/>} />
                        <Route path="/tdashboard" element={<TeacherDashboardPage/>} />
                        <Route path="/tstatus" element={<TStatusPage/>} />
                        <Route path="/tattendence" element={<TAttendancePage/>} />
                        <Route path="/salary" element={<TSalaryPage/>} />
                        <Route path="/tcomplaints" element={<TComplaintsPage/>} />
                        <Route path="/tleave" element={<TLeavePage/>} />
                        <Route path="/tmarks" element={<AssaignMarksPage/>} />
                        <Route path="/allstudents" element={<AllStudentsPage/>} />
                        <Route path="/testdoc" element={<TestDocumentPage/>} />
                    </Routes>
                </AnimatePresence>
                </Iopen.Provider>

    </>

  );
}

export default App;