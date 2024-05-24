// remove duplicates from an array
export default function Practice(){
    function findDplicates(){
        let array = [1, 2, 4, 5 , 1, 2,3,4]
        let countHashMap = {}
        let resultarr = []
        for (let i =0 ; i< array.length; i++){
        if(!countHashMap[array[i]]){
            resultarr.push(array[i])
            countHashMap[array[i]] = true
        } 
        }
        console.log(resultarr , 'hasmap')
    }
    
    findDplicates()


    
    return(<>Haha</>)
}


