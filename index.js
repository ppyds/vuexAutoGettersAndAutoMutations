export default function vuexAutoGettersAndAutoMutations(modules){
    function autoGetters(state, getters, _getters) {
        let obj = {
            ...getters
        }
        for (const stateKey in state) {
            // eslint-disable-next-line no-prototype-builtins
            if (state.hasOwnProperty(stateKey)) {
                let objKey = 'get' + stateKey.replace(stateKey[0], stateKey[0].toUpperCase());
                if (getters && getters[objKey]) {
                    objKey = getters[objKey]
                } else {
                    obj[objKey] = function(state) {
                        return state[stateKey]
                    }
                }
            }
        }
        return obj
    }
    
    function autoMutations(state, mutations, _mutations) {
        let obj = {
            ...mutations
        }
        for (const stateKey in state) {
            // eslint-disable-next-line no-prototype-builtins
            if (state.hasOwnProperty(stateKey)) {
                let objKey = 'set' + stateKey.replace(stateKey[0], stateKey[0].toUpperCase());
                if (mutations && mutations[objKey]) {
                    obj[objKey] = mutations[objKey]
                } else {
                    obj[objKey] = function(state, data) {
                        state[stateKey] = data
                    }
                }
            }
        }
        return obj
    }
    
    for (const modulesKey in modules) {
        modules[modulesKey]['getters'] = autoGetters(modules[modulesKey]['state'], modules[modulesKey]['getters'])
        modules[modulesKey]['mutations'] = autoMutations(modules[modulesKey]['state'], modules[modulesKey]['mutations'])
        modules[modulesKey]['namespaced'] = true
    }

    return modules
}