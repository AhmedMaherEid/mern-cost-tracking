import React from 'react'
import '../resources/default-layout.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'antd';
function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem('mahermoney-user'));
    const navigate = useNavigate();
    const items = [
        {
            label: (
                <li onClick={() => {
                    localStorage.removeItem('mahermoney-user');
                    navigate('/login');
                }}>logout</li>
            )
        }
    ];
    return (
        <div className='layout'>
            <div className="header d-flex justify-content-between align-items-center">
                <div>
                    <h1 className='logo'>MAHER MONEY</h1>
                </div>
                <div>
                    <Dropdown
                        menu={{ items }}
                        placement="bottomLeft">
                        <button className='logout'>{user.name}</button>
                    </Dropdown>
                </div>
            </div>
            <div className='content'>
                {props.children}
            </div>
        </div>
    )
}

export default DefaultLayout