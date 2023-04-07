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

export const SideBarPage = ()=>{
    const [isOpen] = useContext(Iopen)
    return(
        <>
            <section style={{width: isOpen? "210px":"45px", whiteSpace:"nowrap",overflow:"hidden"}} className="sidebar shadow">
                <ul className="sidebaropts">
                    <li><NavLink to="/status" className='navlink' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'white',backgroundColor:"blue",padding:"8px 58px 8px 1px",borderRadius:"8px"}:{ textDecoration: 'none', color:'#8a2435' }}} ><span className='navlinkicon'><AssessmentRoundedIcon/></span>Analytics</NavLink></li>
                    <li><NavLink to="/attendance" className='navlink' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'white',backgroundColor:"blue",padding:"8px 38px 8px 1px",borderRadius:"8px"}:{ textDecoration: 'none', color:'#8a2435' }}} ><span className='navlinkicon'><AssignmentTurnedInRoundedIcon/></span>Attendance</NavLink></li>
                    <li><NavLink to="/marks" className='navlink' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'white',backgroundColor:"blue",padding:"8px 88px 8px 1px",borderRadius:"8px"}:{ textDecoration: 'none', color:'#8a2435' }}} ><span className='navlinkicon'><DnsRoundedIcon/></span>Marks</NavLink></li>
                    <li><NavLink to="/feedues" className='navlink' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'white',backgroundColor:"blue",padding:"8px 63px 8px 1px",borderRadius:"8px"}:{ textDecoration: 'none', color:'#8a2435' }}} ><span className='navlinkicon'><AccountBalanceWalletRoundedIcon/></span>Fee Dues</NavLink></li>
                    <li><NavLink to="/complaints" className='navlink' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'white',backgroundColor:"blue",padding:"8px 38px 8px 1px",borderRadius:"8px"}:{ textDecoration: 'none', color:'#8a2435' }}} ><span className='navlinkicon'><GppMaybeRoundedIcon/></span>Complaints</NavLink></li>
                    <li><NavLink to="/leave" className='navlink' style={({isActive})=>{return isActive?{textDecoration: 'none',color:'white',backgroundColor:"blue",padding:"8px 37px 8px 1px",borderRadius:"8px"}:{ textDecoration: 'none', color:'#8a2435' }}} ><span className='navlinkicon'><BubbleChartRoundedIcon/></span>Apply Leave</NavLink></li>
                    <li className='border-top border-top-2 border-dark'><AccountCircleRoundedIcon /><NavLink to="/leave" className='navlink' ><span className='navlinkicon'></span></NavLink></li>
                </ul>
                {/* images */}
                {/* border border-top-5 border-danger rounded */}
                {/* <img width={28} src='assets/images/icons8-combo-chart-30.png' alt='complaint'/> */}
                {/* <img width={28} src='assets/images/icons8-test-passed-30.png' alt='complaint'/> */}
                {/* <img width={28} src='assets/images/icons8-approval-30.png' alt='complaint'/> */}
                {/* <img width={28} src='assets/images/icons8-money-bag-bitcoin-30.png' alt='complaint'/> */}
                {/* <img width={28} src='assets/images/icons8-query-94.png' alt='complaint'/> */}
                {/* <img width={28} src='assets/images/icons8-leave-30.png' alt='complaint'/> */}
                {/* images */}
            </section>
        </>
    )
}