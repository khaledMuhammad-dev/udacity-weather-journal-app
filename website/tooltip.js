/**
 * Advature
 * --------------
 * action (hover)
 * show the tolltip display block
 * with animate slide up
 * contains a daynamic content
 * ----------------------------
 * if the teb on the edge of the device window make sure to not leak
 * out of the window X & Y
 */

/**
 * * (Begin) Global Variables.
 * ===========================
 * 
 */
    let animationRef = -1;
/**
 * (End) Global Variables.
 * (Begin) Helper Functions
 * 
 */
    function activeAnimation(fn) {
        return setTimeout(fn, 0);
    }

    function exitAnimation(fun, duration = 300) {
        return setTimeout(fun, duration);
    }

    function showTooltip() {

        tooltip.setAttribute("class", "__tool__tip active__tooltip");
        activeAnimation( () => tooltip.setAttribute("class", "__tool__tip active__tooltip fade_in__tooltip") );
    }

    function hideTooltip() {
        if ( tooltip.classList.contains("hide") ) {
            return
        }

        tooltip.setAttribute("class", "__tool__tip hide fade_out__tooltip");

        animationRef = exitAnimation(() => {
            tooltip.setAttribute("class", "__tool__tip hide hide__tooltip");
        }, 150);
    }

    // top  = target y - tooltip height - offset
    // left = target x + 50% of target width - 50% of tooltip width
    function tooltipPosition(target) {
        const { x, y, width } = target.getBoundingClientRect();
        tooltip.style.top = `${ target.offsetTop - tooltip.offsetHeight + -5 }px`;
        tooltip.style.left = `${ x }px`;
    }

/**
 * (End) Helper Functions
 * (Begin) Main Functions.
 * 
 */
    function insertToolTip() {
        const body = document.querySelector("body");
        const tooltip = document.createElement("div");

        tooltip.setAttribute("class","__tool__tip hide hide__tooltip");
        body.appendChild(tooltip);

    }

    function handleTooltip({ target }) {
        // Mouse Leave
        if( !target.hasAttribute("data-tooltip") ) {
            hideTooltip();

            return;
        }
        // Mouse Enter
        if( animationRef > -1 ) {
            clearTimeout(animationRef);
            animationRef = -1;
        }

        tooltip.textContent = target.dataset.tooltip;
        tooltip.classList.remove("hide");

        showTooltip();
        tooltipPosition(target);
    
    }



/**
 * (End) Main Functions
 * (Begin) Invocation
 * 
 */ 
    // Insert tooltip to the dom
    insertToolTip();
    
    // Detect Tooltip
    const tooltip = document.querySelector(".__tool__tip");
    document.addEventListener("mouseover", handleTooltip);