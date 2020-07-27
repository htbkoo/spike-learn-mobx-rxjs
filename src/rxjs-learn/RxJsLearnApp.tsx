import React from "react";
import { Route, Switch, useRouteMatch, } from "react-router-dom";

import LinksMenuList from "../utils/LinksMenuList";
import useScript from "../utils/hooks";

declare var SuperGif: any;

const URL_PATHS = {
    RX_JS: "rxjs"
}

function RxJsLearnAppMenu() {
    const match = useRouteMatch();

    return (
        <nav>
            <LinksMenuList
                items={[
                    { to: `${match.url}/${URL_PATHS.RX_JS}`, primary: "With RxJS" }
                ]}
            />
        </nav>
    )
}

function RxJsLearnApp() {
    const match = useRouteMatch();

    return (
        <div>
            {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path={match.path}>
                    <h3>Please select an implementation.</h3>
                </Route>
                <Route path={`${match.path}/${URL_PATHS.RX_JS}`}>
                    <RxJsPlaygroundApp/>
                </Route>
                <Route path="*">
                    <div/>
                </Route>
            </Switch>
        </div>
    );
}

const IMG_ELEMENT_ID = "animated_img";

function RxJsPlaygroundApp() {
    // TODO: refactor to serve locally
    useScript("https://htbkoo.github.io/canvas-animation-spike/resources/js/libgif-js/libgif.js")
    useScript("https://htbkoo.github.io/canvas-animation-spike/resources/js/libgif-js/rubbable.js")

    loadSuperGif(IMG_ELEMENT_ID);

    return (
        <div>
            <div>
                <img src="../assets/img/lihkg_dance2.gif" rel:animated_src="resources/img/lihkg_dance2.gif"
                     width="250" height="276" rel:auto_play="0" rel:rubbable="0" id={IMG_ELEMENT_ID} alt="dance"/>
            </div>
            Try RxJS
        </div>
    )

    function loadSuperGif(elementId) {
        var element = document.getElementById(elementId);
        var sup1 = new SuperGif({ gif: element });
        sup1.loadUrl();
        addWheelListener()

        // sup1.load_url();


        function addWheelListener() {
            window.addEventListener('wheel', function (e) {
                /*
                * wheel { target: html, buttons: 0, clientX: 596, clientY: 409, layerX: 596, layerY: 409 }
                * */

                e.preventDefault(); // No scroll

                let currentFrame = sup1.get_current_frame();

                // The following equation will return either a 1 for scroll down
                // or -1 for a scroll up
                var delta = Math.max(-1, Math.min(1, e.deltaY));

                let nextFrame = (currentFrame + delta + 32) % 32


                sup1.move_to(nextFrame)
            });
        }

    }
}

export {
    RxJsLearnAppMenu,
    RxJsLearnApp,
};
