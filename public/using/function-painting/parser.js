/**
 * Function Painting
 * 
 * @author NriotHrreion
 * Copyright (c) NriotHrreion 2021
 */

(function(window) {

    /**
     * 
     * @param {string} formula The formula
     */
    function Parser(formula) {
        let x = 1;
        try {
            var result = eval(formula);
        } catch(e) {
            return false;
        }
        if(typeof result != "number" || result == null || result.toString() == "NaN") {
            return false;
        }

        formula = formula.replace(/ /g, "");

        while(formula.indexOf("^") != -1) {
            var index = formula.indexOf("^");
            var num = formula.substr(index - 1, 1);
            var power = formula.substr(index + 1, 1);
            
            formula = formula.replace(num +"^"+ power, "Math.pow("+ num+ ","+ power +")");
        }
        return formula;
    }
    
    window.$parser = Parser;
})(window);
