const searchItems = () => {
    var data = ReadDataBase()
    UpdateTable(data)
}


function ReadDataBase() {
    var items = "";
    var table = Array();

    let elems = document.getElementsByName('searchKey');
    let val = "";

    for(var ele of elems){
        if(ele.checked){
            val = ele.value;
            break;
        }
    }

    let searchValue = 0
    switch (val) {
        case "buy":
            searchValue = document.getElementById('buyValue').value;
            items = DataBase.filter((e)=>(
                (e.price.buy==searchValue)
            ));
            break;
        case "sell":
            searchValue = document.getElementById('sellValue').value;
            items = DataBase.filter((e)=>(
                (e.price.sell==searchValue)
            ));
            break;
        case "all":
            items = DataBase;
            break;
        default:
            break;
    }

    items.forEach(item => {
        table.push(item);
    });

    return table;
}

function UpdateTable(data){
    let table = document.getElementById('result_table');
    // ヘッダー以外を削除
    while (table.rows.length > 1) table.deleteRow(-1);

    let tbody = document.getElementById('result_body');

    for(var d of data){
        const row = document.createElement("tr");
        AddtdInRow(row, "");
        AddtdInRow(row, ConvertItemTypeToString(d.type));
        AddtdInRow(row, d.name);
        AddtdInRow(row, d.price.buy);
        AddtdInRow(row, d.price.sell);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);

}

function ConvertItemTypeToString(type){
    var itemName = '';
    switch (type) {
        case ItemType.Scroll:
            itemName = '巻物';
            break;
        case ItemType.Bangle:
            itemName = '腕輪';
            break;
        case ItemType.Grass:
            itemName = '草';
            break;
        case ItemType.Amulet:
            itemName = '札'
            break;
        case ItemType.Jar:
            itemName = '壺'
            break;
        case ItemType.Cane:
            itemName = '杖'
            break;
        default:
            itemName = ''
    }
    return itemName;
}

function AddtdInRow(row, text){
    let cell = document.createElement("td");
    let cellText = document.createTextNode(text);
    cell.appendChild(cellText);
    row.appendChild(cell);
}
