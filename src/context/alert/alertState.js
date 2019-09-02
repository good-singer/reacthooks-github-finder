import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

const AlertState = props => {
  // 初始化状态
  const initialState = null;

  // 使用useReducer
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // 实现方法
  const showAlert = (msg, type) => {
    dispatch({

    })
  }

}