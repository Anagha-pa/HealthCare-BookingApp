import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const adminSlice = createSlice({
    name:'admin',
    initialState:{
        admin:null,
        adminToken : localStorage.getItem('adminToken') || null ,
        isAdmin_auth : false,
    },
    reducers :{
        setAdminToken : (state,action) => {
            state.adminToken =action.payload;
            state.isAdmin_auth = action.payload != null;
        },

        login :(state,action) =>{
            state.admin = action.payload;
        },
        logout: (state) => {
            state.admin = null;
            state.adminToken = null;
            state.isAdmin_auth = false;
            localStorage.removeItem('adminToken');
          },
    },
});

export const {setAdminToken,login,logout} = adminSlice.actions;
export const selectUser = (state)=> state.admin.admin
 