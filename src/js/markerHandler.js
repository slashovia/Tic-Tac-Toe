export const markHandler = function () {
    const markers = document.querySelectorAll('input[name="p1marker"], input[name="p2marker"]')
    const p1markerX = document.querySelector('#p1markerX')
    const p1markerO = document.querySelector('#p1markerO')
    const p2markerX = document.querySelector('#p2markerX')
    const p2markerO = document.querySelector('#p2markerO')

    function switchMarkers() {
        for (const mark of markers) {
            mark.addEventListener('click', e => {
                if (e.target.id === 'p1markerX' || e.target.id === 'p2markerO') {
                    p1markerX.checked = true;
                    p2markerO.checked = true
                }
                else {
                    p1markerO.checked = true;
                    p2markerX.checked = true;
                }
            })
        }
    }
    return {
        switchMarkers
    }
}()