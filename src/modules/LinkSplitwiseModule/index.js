import PropTypes from 'prop-types';
import React from 'react';

import Modal from '../../components/ModalComponent';

import makeCall, {
    CALL_TYPE_GET
} from '../../utils/restful';

class LinkSplitwiseModule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            splitwiseAuthorizationURL: ''
        };
    }

    componentDidMount() {
        makeCall({
            method: CALL_TYPE_GET,
            URL: 'http://localhost:3100/api/splitwise-code'
        }).then((response) => {
            const {
                splitwiseAuthorizationURL
            } = response;

            this.setState({
                splitwiseAuthorizationURL
            });
        }).catch(() => {
            // No action needed.
        });
    }

    handleRedirect = () => {
        const {
            state: {
                splitwiseAuthorizationURL
            }
        } = this;

        window.location.href = splitwiseAuthorizationURL;
    }

    render() {
        const {
            props: {
                toggleModal
            },
            state: {
                splitwiseAuthorizationURL
            }
        } = this;

        return (
            <Modal
                handleClickCTAPrimary={this.handleRedirect}
                handleClickCTASecondary={toggleModal}
                handleClose={toggleModal}
                isShown={splitwiseAuthorizationURL}
                labelCTAPrimary={'Link Splitwise'}
                labelCTASecondary={'Not Now'}
            >
                <h2 className={'mb--2'}>
                    {'Link Splitwise'}
                </h2>
                <p>
                    {'This application leverages Splitwise for financial data and will not function without it.'}
                </p>
            </Modal>
        );
    }
}

LinkSplitwiseModule.propTypes = {
    toggleModal: PropTypes.func
};

LinkSplitwiseModule.defaultProps = {
    toggleModal: () => { }
};

export default LinkSplitwiseModule;
