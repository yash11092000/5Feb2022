// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

// pragma experimental ABIEncoderV2;

contract SimpleStorage {
    uint256 storedData;

    struct Prod {
        uint256 ProdId;
        string ProdName;
        string CreatedDate;
        string PickedDate;
        string DeliveredDate;
        bool IsPicked;
        bool Isdelivered;
    }

    mapping(uint256 => Prod) Items;

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }

    function CreatedProd(
        uint256 id,
        string memory _ProdName,
        string memory _CreatedDate
    ) public returns (uint256) {
        Items[id].ProdId = id;
        Items[id].ProdName = _ProdName;
        Items[id].CreatedDate = _CreatedDate;
        Items[id].IsPicked = false;
        Items[id].Isdelivered = false;
        return id;
    }

    function GetProd(uint256 id) public view returns (string memory) {
        return Items[id].ProdName;
    }
}
