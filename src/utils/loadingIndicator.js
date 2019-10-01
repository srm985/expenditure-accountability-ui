import LoadingIndicator from '../components/LoadingIndicatorComponent';

const loadingIndicator = {
    hide: () => {
        const {
            displayName
        } = LoadingIndicator;

        const loadingIndicatorElement = document.getElementsByClassName(displayName)[0];

        loadingIndicatorElement.classList.remove(`${displayName}--visible`);
    },

    show: () => {
        const {
            displayName
        } = LoadingIndicator;

        const loadingIndicatorElement = document.getElementsByClassName(displayName)[0];

        loadingIndicatorElement.classList.add(`${displayName}--visible`);
    }
};

export default loadingIndicator;
