export default function locator(){
    fetch('https://freegeoip.app/json/')
    .then(resp => resp.json())
    .then(result => console.log(result))
}