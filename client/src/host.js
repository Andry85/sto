export let REACT_APP_DOMAIN_VAR;
if (window.location.hostname === 'localhost') {
    REACT_APP_DOMAIN_VAR = 'http://localhost:5000';
} else if (window.location.hostname === 'parkovka.in.ua') {
    REACT_APP_DOMAIN_VAR = 'http://parkovka.in.ua';
} else if (window.location.hostname === 'www.parkovka.in.ua') {
    REACT_APP_DOMAIN_VAR = 'http://www.parkovka.in.ua';
}
