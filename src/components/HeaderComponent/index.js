import PropTypes from 'prop-types';
import React from 'react';
import {
    withRouter
} from 'react-router-dom';

import Button from '../ButtonComponent';

import {
    BUTTON_STYLE_TYPE_INLINE
} from '../ButtonComponent/config';

import authentication from '../../utils/authentication';
import classNames from '../../utils/classNames';

import './styles.scss';

class HeaderComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hasScrolled: false
        };
    }

    componentDidMount() {
        document.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const {
            body,
            documentElement
        } = document;

        const hasScrolled = !!(body.scrollTop || documentElement.scrollTop);

        this.setState({
            hasScrolled
        });
    }

    handleLogout = () => {
        const {
            props: {
                history
            }
        } = this;

        authentication.clear();

        history.push('/');
    }

    render() {
        const {
            props: {
                shouldChangeOnScroll
            },
            state: {
                hasScrolled
            }
        } = this;

        const {
            displayName
        } = HeaderComponent;

        const componentClassNames = classNames(
            displayName,
            {
                [`${displayName}--scrolled`]: hasScrolled && shouldChangeOnScroll
            }
        );

        return (
            <header className={componentClassNames}>
                <span className={`${displayName}__logo`}>
                    {'ExpenditureAccountability'}
                </span>
                <Button
                    className={`${displayName}__navigation-link`}
                    handleClick={this.handleLogout}
                    label={'Logout'}
                    styleType={BUTTON_STYLE_TYPE_INLINE}
                />
            </header>
        );
    }
}

HeaderComponent.displayName = 'HeaderComponent';

HeaderComponent.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    }),
    shouldChangeOnScroll: PropTypes.bool
};

HeaderComponent.defaultProps = {
    history: {},
    shouldChangeOnScroll: false
};

export default withRouter(HeaderComponent);
