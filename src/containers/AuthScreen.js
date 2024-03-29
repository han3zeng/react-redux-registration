import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'

const _ = {
  get,
}

export default (ComposedComponent) => {
  class AuthenticationScreen extends React.Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push(this.props.route.redirectPath)
      }
    }

    componentWillUpdate() {
      if (!this.props.authenticated) {
        this.context.router.push(this.props.route.redirectPath)
      }
    }

    render() {
      if (this.props.authenticated) {
        return <ComposedComponent {...this.props} />
      }
      return null
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: _.get(state, 'auth.authenticated', false),
    }
  }

  AuthenticationScreen.contextTypes = {
    router: PropTypes.object,
  }

  AuthenticationScreen.defaultProps = {
    authenticated: false,
    route: {},
  }

  AuthenticationScreen.propTypes = {
    authenticated: PropTypes.bool,
    route: PropTypes.object,
  }

  return connect(mapStateToProps)(AuthenticationScreen)
}
