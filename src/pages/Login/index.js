import { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, WingBlank, Toast } from 'antd-mobile';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../utils/api';
import storage from '../../utils/storage';
import './index.scss';

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/;
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/;
export class Login extends Component {
  render() {
    return (
      <div className="login">
        <NavBar
          className="nav-header"
          mode="light"
          leftContent={<i className="iconfont icon-back"></i>}
          onLeftClick={() => this.props.history.goBack()}
        >账号登录</NavBar>
        <WingBlank>
          <Form className="login-form">
            <div className="login-form__item">
              <Field
                name="username"
                placeholder="请输入账号"
              />
            </div>
            <ErrorMessage
              className="login-form__message--error"
              name="username"
              component="div"
            />
            <div className="login-form__item">
              <Field
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            <ErrorMessage
              className="login-form__message--error"
              name="password"
              component="div"
            />
            <button className="login-form__submit" type="submit">登录</button>
          </Form>
          <div className="login-reg">
            <Link to="/registry">还没有账号，去注册~</Link>
          </div>
        </WingBlank>
      </div>
    );
  }
}

const LoginWithFormik = withFormik({
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required('账号为必填项')
      .matches(REG_UNAME, '长度为5到8位，只能出现数字、字母、下划线'),
    password: Yup.string()
      .required('密码为必填项')
      .matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线')
  }),
  mapPropsToValues: () => ({ username: '', password: '' }),
  async handleSubmit(values, { props }) {
    const { username, password } = values;
    const [err, res] = await api.login({ username, password });

    if (err) {
      Toast.fail('登录失败');
      return;
    }

    const { status, description, body } = res.data;

    if (status !== 200) {
      Toast.info(description);
    } else {
      const token = body.token;
      storage.setData('token', token);
      Toast.success('登录成功', 2, () => {
        if (!props.location.state) {
          props.history.goBack();
        } else {
          props.history.replace(props.location.state.from.pathname);
        }
      });
    }
  }
})(Login);

export default LoginWithFormik;
