import { ADD_MESSAGE } from "../actions/action-types";

const prohibited = store => next => action => {
    let prohibido = ['porno', 'caca'];
    if (action.type === ADD_MESSAGE) {
        prohibido.forEach(function (x) {

           /* let asteriscos = x.split("").map(x => x = "*").join('');

            action.payload = action.payload.split(" ").map(function(z) {
                  if(z.includes(",") || z.includes(".")){
                      return z.split(",").map(y => y.replace(new RegExp(x,"gi"),asteriscos)).join(",");
                   }
                   else{
                     return z.toLowerCase() === x ? z.replace(new RegExp(x,"gi"), asteriscos): z;
                   }
              }).join(" ");*/

            action.payload = action.payload.replace(new RegExp("\\b" + x + "\\b", "gi"), "*".repeat(x.length));
        });
    }
    next(action);
}

export default prohibited;