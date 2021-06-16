import { useState, useEffect } from 'react';

import api from '../../services/api';

import { useDispatch } from 'react-redux';

import { TreeSelect, Spin } from 'antd';

 function SelectTree() {
    const [value, setValue] = useState(undefined);
    const [companies, setCompanies] = useState([]);

    const dispatch = useDispatch();
    
    useEffect(() => {
        joinCompanyUnit();
    })

    const onChange = (e) => {
        setValue(value);
        dispatch({ type: 'SET_COMPANY', company: e })
    }

    async function getUnits() {
        const response = await api.get('units')
        return response.data
    }

    async function getCompanies() {
        const response = await api.get('companies')
        return response.data
    }

    async function joinCompanyUnit() {
        let arrayNovo = []
        const companies  = await getCompanies()
        const units = await getUnits()

        companies.forEach(company => {
            let unitsCompany = []
            units.forEach(unity => {
                if(unity.companyId === company.id){
                    unitsCompany.push({ value: `${company.id}-${unity.id}`, title: unity.name })
                }
            })
            arrayNovo.push({ title: company.name, value: `${company.id}`, children: unitsCompany })           
        })
        setCompanies(arrayNovo)
    }

    const onLoadData = treeNode =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 300);
    });

    function loadingContent () {
        return (
            <div>
                <Spin tip="Carregando" size="small" style={{ margin: 0  }}/>
            </div>
        )
    }
    
    return (
        <>
            <TreeSelect
        style={{ width: '100%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={companies}
        placeholder="Empresa/Unidade"
        treeDefaultExpandAll
        onChange={onChange}
        loadData={onLoadData}
        notFoundContent={loadingContent()}
      />
      </>
    )
}

export default SelectTree;