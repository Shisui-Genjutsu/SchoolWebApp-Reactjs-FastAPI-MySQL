import React, { useContext } from 'react';
// import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
// import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
// import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined';
// import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import GppMaybeRoundedIcon from '@mui/icons-material/GppMaybeRounded';
import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded';
// import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
// import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { NavLink } from 'react-router-dom';
import {Iopen} from '../App';

export const TeacherSideBarPage = ()=>{
    const [isOpen] = useContext(Iopen)
    return(
        <>
            <section style={{width: isOpen? "210px":"45px", whiteSpace:"nowrap",overflow:"hidden"}} className="sidebar shadow">
                <ul className="sidebaropts">
                    <li><NavLink to="/tstatus" className='navlink' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'white',backgroundColor:"blue",padding:"8px 58px 8px 1px",borderRadius:"8px"}:{ textDecoration: 'none', color:'#8a2435' }}} ><span className='navlinkicon'><AssessmentRoundedIcon/></span>Analytics</NavLink></li>
                    <li><NavLink to="/tattendence" className='navlink' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'white',backgroundColor:"blue",padding:"8px 38px 8px 1px",borderRadius:"8px"}:{ textDecoration: 'none', color:'#8a2435' }}} ><span className='navlinkicon'><AssignmentTurnedInRoundedIcon/></span>Attendance</NavLink></li>
                    <li><NavLink to="/tmarks" className='navlink' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'white',backgroundColor:"blue",padding:"8px 88px 8px 1px",borderRadius:"8px"}:{ textDecoration: 'none', color:'#8a2435' }}} ><span className='navlinkicon'><DnsRoundedIcon/></span>Marks</NavLink></li>
                    <li><NavLink to="/salary" className='navlink' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'white',backgroundColor:"blue",padding:"8px 63px 8px 1px",borderRadius:"8px"}:{ textDecoration: 'none', color:'#8a2435' }}} ><span className='navlinkicon'><AccountBalanceWalletRoundedIcon/></span>Salary</NavLink></li>
                    <li><NavLink to="/tcomplaints" className='navlink' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'white',backgroundColor:"blue",padding:"8px 38px 8px 1px",borderRadius:"8px"}:{ textDecoration: 'none', color:'#8a2435' }}} ><span className='navlinkicon'><GppMaybeRoundedIcon/></span>Complaints</NavLink></li>
                    <li><NavLink to="/tleave" className='navlink' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'white',backgroundColor:"blue",padding:"8px 37px 8px 1px",borderRadius:"8px"}:{ textDecoration: 'none', color:'#8a2435' }}} ><span className='navlinkicon'><BubbleChartRoundedIcon/></span>Apply Leave</NavLink></li>
                    <li className='border-top border-top-2 border-dark'><AccountCircleRoundedIcon /><NavLink to="/leave" className='navlink' ><span className='navlinkicon'></span></NavLink></li>
                </ul>
            </section>
        </>
    )
}