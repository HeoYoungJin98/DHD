function Create_Table(array, loc_head, loc_body){
    let length = array.length; //array length
    let r = 0;
    let c = array[0].length;

    //Number of Value
    let Row = length/2;
    
    //Set Table Header
    let Create_Tr = document.createElement("tr");
    Create_Tr.setAttribute("class","class_tr");
    loc_head.appendChild(Create_Tr);
    for(let i = 0; i<c; i++){
        let Create_Td = document.createElement("td");
        let Text = document.createTextNode(array[0][i]);
        let p = document.createElement("p");
        p.setAttribute("class","Font");
        p.appendChild(Text);
        Create_Td.appendChild(p);
        Create_Tr.appendChild(Create_Td);
    }

    //Set Table Body
    while(r < Row){
        let Create_Tr2 = document.createElement("tr");
        loc_body.appendChild(Create_Tr2);
        for(let i=0; i<c; i++){
            if(array[r*Row + 1][i] == null){
                array[r*Row + 1][i] = 0;
            }
            let Create_Td = document.createElement("td");
            let Text = document.createTextNode(array[r*Row + 1][i]);
            let p = document.createElement("p");
            p.setAttribute("class","Font");
            p.appendChild(Text);
            Create_Td.appendChild(p);
            Create_Tr2.appendChild(Create_Td);
        }
        r++;
    }
}