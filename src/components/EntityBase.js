import React, { Component, createRef } from 'react';
import axios from 'axios';
import AppConfig from '../config';
import Table from './Table';
import BasicForm from './BasicForm';

class EntityBaseComponent extends Component {
    /**
     * Must specify entityDef in props
     */
    constructor(props) {
        super(props);
        this.formRef = createRef(null);
        this.formWrapperRef = createRef(null);
        this.createButtonRef = createRef(null);
        this.state = {
            showForm: false,
            records: []
        };
    }

    tableFields() {
        let _fields = this.props.entityDef.fields.filter(field => field.table_display)
        if(this.props.includeOps) {
            _fields.push({
                id: '__OPERATIONS',
                label: 'Operations',
                table_display: true
            });
        }
        return _fields;
    }

    showForm() {
        this.formWrapperRef.current.classList.remove('hidden');
    }

    hideForm() {
        this.formWrapperRef.current.classList.add('hidden');
    }

    showCreate = () => {
        this.formRef.current.clearData();
        this.showForm()
        this.createButtonRef.current.classList.add('hidden');
    }

    hideCreate = () => {
        this.hideForm()
        this.createButtonRef.current.classList.remove('hidden');
    }

    getRecord(record_id) {
        // check loaded records first
        const record = this.state.records.find(r => r[this.props.entityDef.id_field] === record_id)
        if (record) {
            return record;
        }
        // record not found in current dataset/page, fall back to API lookup
        alert("getRecord: fallback API lookup is UNIMPLEMENTED");
    }

    showEdit(record_id) {
        // get data for record to be edited
        const recordData = this.getRecord(record_id);
        this.formRef.current.loadData(recordData);
        this.showForm()
        this.createButtonRef.current.classList.remove('hidden');
    }

    doDelete(record_id) {
        let deleteOneUrl = `${AppConfig.backend_host}${this.props.entityDef.endpoints.deleteOne}/${record_id}`;
        axios
            .delete(deleteOneUrl)
            .then( response => {
                console.log("record successfully deleted")
                this.refreshTableData();
              })
            .catch( error => {
                //this.setState( { error_message: error.response.data, success_message: '' } );
                console.log("error deleted record:",error)
            })
        ;
    }

    componentDidMount() {
        this.refreshTableData();
    }

    finishForm() {
        this.hideForm();
        this.refreshTableData();
    }

    refreshTableData() {
        let getAllUrl = `${AppConfig.backend_host}${this.props.entityDef.endpoints.getMultipleByQuery}`;
        axios
            .get(getAllUrl)
            .then( response => {
                let tableData = response.data.map(row => {
                    row.id = row[this.props.entityDef.id_field];
                    row.__OPERATIONS = (
                        <div>
                            <button onClick={() => this.doDelete(row.id)}>delete</button>
                            <button onClick={() => this.showEdit(row.id)}>edit</button>
                        </div>
                    )
                    return row
                })
                this.setState( {
                    records: tableData
                })
            })
    }

    render() {
        return(
            <div>
                <div ref={this.formWrapperRef} className={this.state.showForm ? null : 'hidden'}>
                    <BasicForm
                        entityDef={this.props.entityDef}
                        onComplete={() => this.finishForm()}
                        ref={this.formRef}
                        onCancel={this.hideCreate}
                    />
                </div>
                <button ref={this.createButtonRef} onClick={this.showCreate}>New {this.props.entityDef.label}</button>
                <Table
                    headers={this.tableFields()}
                    getData={() => this.state.records}
                />
            </div>
        );
    }
}

export default EntityBaseComponent;