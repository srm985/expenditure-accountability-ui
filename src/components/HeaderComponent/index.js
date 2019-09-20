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

        console.log({
            hasScrolled
        });

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
            hasScrolled
        } = this.state;

        const {
            displayName
        } = HeaderComponent;

        const componentClassNames = classNames(
            displayName,
            {
                [`${displayName}--scrolled`]: hasScrolled
            }
        );

        return (
            <header className={componentClassNames}>
                <span className={`${displayName}__logo`}>
                    {'ExpenditureAccountability'}
                </span>
                <ul className={`${displayName}__navigation`}>
                    <li>
                        <Button
                            className={`${displayName}__navigation-link`}
                            handleClick={this.handleLogout}
                            label={'Logout'}
                            styleType={BUTTON_STYLE_TYPE_INLINE}
                        />
                    </li>
                </ul>
            </header>
        );
    }
}

HeaderComponent.displayName = 'HeaderComponent';

HeaderComponent.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    })
};

HeaderComponent.defaultProps = {
    history: {}
};

export default withRouter(HeaderComponent);
