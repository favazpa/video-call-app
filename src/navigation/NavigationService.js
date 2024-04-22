import * as React from 'react';
import {
  createNavigationContainerRef,
  StackActions,
  TabActions,
} from '@react-navigation/native';

const listeners = {};

const removeNavigationListener = (event, callback) => {
  if (listeners[event]) {
    listeners[event] = listeners[event].filter(cb => cb !== callback);
  }
};

const executeNavigationListeners = (eventName, ...args) => {
  if (listeners[eventName]) {
    listeners[eventName].forEach(fn => fn(...args));
  }
};

export const addNavigationListener = (event, callback) => {
  listeners[event] = listeners[event] || [];
  listeners[event].push(callback);

  return () => removeNavigationListener(event, callback);
};

export const isReadyRef = React.createRef();
export const navigationRef = createNavigationContainerRef();

export const navigationListenerProps = {
  onTransitionEnd: (props, ...args) =>
    executeNavigationListeners('transitionEnd', ...args),
  onTransitionStart: (props, ...args) =>
    executeNavigationListeners('transitionStart', ...args),
  onGestureStart: (props, ...args) =>
    executeNavigationListeners('gestureStart', ...args),
  onGestureEnd: (props, ...args) =>
    executeNavigationListeners('gestureEnd', ...args),
  onGestureCancel: (props, ...args) =>
    executeNavigationListeners('gestureCancel', ...args),
};

export const navigate = (routeName, params) => {
  if (isReadyRef.current && navigationRef && navigationRef.current) {
    // @ts-ignore
    navigationRef?.current?.navigate(routeName, params);
  }
};

export const push = (routeName, params) => {
  if (isReadyRef.current && navigationRef && navigationRef.current) {
    navigationRef.current.dispatch(StackActions.push(routeName, params));
  }
};

export const goBack = () => {
  if (isReadyRef.current && navigationRef && navigationRef.current) {
    navigationRef.current.goBack();
  }
};

export const pop = (...args) => {
  if (isReadyRef.current && navigationRef && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.pop(...args));
  }
};

export const popToTop = () => {
  if (isReadyRef.current && navigationRef && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current?.dispatch(StackActions.popToTop());
  }
};

export const reset = params => {
  if (isReadyRef.current && navigationRef && navigationRef.current) {
    navigationRef.current?.reset(params);
  }
};

export const replace = params => {
  if (isReadyRef.current && navigationRef && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.replace(params));
  }
};

export const jumpTo = params => {
  if (isReadyRef.current && navigationRef && navigationRef.current) {
    navigationRef.current?.dispatch(TabActions.jumpTo(params));
  }
};
