/*
 * Copyright (C) 2020 The ToastHub Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use-strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as testcaseActions from './testcase-actions';
import fuLogger from '../../core/common/fu-logger';
import TestCaseView from '../../memberView/pm_testcase/testcase-view';
import TestCaseModifyView from '../../memberView/pm_testcase/testcase-modify-view';
import BaseContainer from '../../core/container/base-container';


class PMTestCaseContainer extends BaseContainer {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.actions.init();
	}

	getState = () => {
		return this.props.pmtestcase;
	}
	
	getForm = () => {
		return "PM_TESTCASE_FORM";
	}
	
	
	onOption = (code,item) => {
		fuLogger.log({level:'TRACE',loc:'PMTeamContainer::onOption',msg:" code "+code});
		if (this.onOptionBase(code,item)) {
			return;
		}
		
	}
	
	render() {
		fuLogger.log({level:'TRACE',loc:'TestCaseContainer::render',msg:"Hi there"});
		if (this.props.pmtestcase.isModifyOpen) {
			return (
				<TestCaseModifyView
				itemState={this.props.pmtestcase}
				appPrefs={this.props.appPrefs}
				onSave={this.onSave}
				onCancel={this.onCancel}
				inputChange={this.inputChange}
				/>
			);
		} else if (this.props.pmtestcase.items != null) {
			return (
				<TestCaseView
				itemState={this.props.pmtestcase}
				appPrefs={this.props.appPrefs}
				onListLimitChange={this.onListLimitChange}
				onSearchChange={this.onSearchChange}
				onSearchClick={this.onSearchClick}
				onPaginationClick={this.onPaginationClick}
				onOrderBy={this.onOrderBy}
				closeModal={this.closeModal}
				onOption={this.onOption}
				inputChange={this.inputChange}
				session={this.props.session}
				/>
			);
		} else {
			return (<div> Loading... </div>);
		}
	}
}

PMTestCaseContainer.propTypes = {
	appPrefs: PropTypes.object,
	actions: PropTypes.object,
	pmtestcase: PropTypes.object,
	session: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {appPrefs:state.appPrefs, pmtestcase:state.pmtestcase, session:state.session};
}

function mapDispatchToProps(dispatch) {
  return { actions:bindActionCreators(testcaseActions,dispatch) };
}

export default connect(mapStateToProps,mapDispatchToProps)(PMTestCaseContainer);
