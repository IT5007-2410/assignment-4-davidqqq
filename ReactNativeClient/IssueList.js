import React, { Component, useState } from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  useColorScheme,
  View,
} from 'react-native';

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');


function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function graphQLFetch(query, variables = {}) {
  try {
    /****** Q4: Start Coding here. State the correct IP/port******/
    const response = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
      /****** Q4: Code Ends here******/
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);
    console.log(result)
    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

class IssueFilter extends React.Component {
  render() {
    return (
      <>
        {/****** Q1: Start Coding here. ******/}
        <Button title="Filter by title"><Text>Filter by title</Text></Button>
        <Button title="Filter by owner"><Text>Filter by owner</Text></Button>
        <Button title="Filter by status"><Text>Filter by status</Text></Button>
        {/****** Q1: Code ends here ******/}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: {
    textAlign: 'left',
    fontWeight: '600',
    color: 'white',

  },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  table: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: '#537791',
  }
});

const width = [40, 80, 80, 80, 80, 80, 200];

function IssueRow(props) {
  const issue = props.issue;
  {/****** Q2: Coding Starts here. Create a row of data in a variable******/ }
  {/****** Q2: Coding Ends here.******/ }
  return (
    <>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
      <View style={{ alignSelf: 'stretch', flexDirection: 'row' }}>
        <View style={{ flex: 1, }}><Text>{issue.id}</Text></View>
        <View style={{ flex: 1, }}><Text>{issue.title}</Text></View>
        <View style={{ flex: 1, }}><Text>{issue.status}</Text></View>
        <View style={{ flex: 1, }}><Text>{issue.owner}</Text></View>
        <View style={{ flex: 1, }}><Text>{new Date(issue.created).toISOString()}</Text></View>
      </View>
      {/****** Q2: Coding Ends here. ******/}
    </>
  );
}

const IssueRows = (props) => props.issues.map(issue =>
  <IssueRow key={issue.id} issue={issue} />
);
function IssueTable(props) {

  console.log(props.issues)
  {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/ }

  {/****** Q2: Coding Ends here. ******/ }


  return (
    <View style={styles.container}>

      <View style={styles.table}>
        <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text style={styles.text}>Id</Text></View>
        <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text style={styles.text}>Title</Text></View>
        <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text style={styles.text}>Status</Text></View>
        <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text style={styles.text}>Owner</Text></View>
        <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text style={styles.text}>Created</Text></View>
      </View>
      <ScrollView>
        <IssueRows issues={props.issues} />
        {/****** Q2: Coding Ends here. ******/}
      </ScrollView>
    </View>
  );
}


class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    /****** Q3: Start Coding here. Create State to hold inputs******/
    this.state = { title: '', owner: '' };
    /****** Q3: Code Ends here. ******/
  }

  /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
  /****** Q3: Code Ends here. ******/

  handleSubmit() {
    /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
    const issue = { title: this.state.title, owner: this.state.owner };
    this.props.createIssue(issue);
    this.setState({ title: '', owner: '' });
    /****** Q3: Code Ends here. ******/
  }

  render() {
    return (
      <View style={styles.container}>
        {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <Text>Add Issue</Text>
        <Text>Title</Text>
        <TextInput placeholder="Title" value={this.state.title} onChangeText={(title) => this.setState({ title })} />
        <Text>Owner</Text><TextInput placeholder="Owner" value={this.state.owner} onChangeText={(owner) => this.setState({ owner })} />
        <Button title="Submit" onPress={this.handleSubmit} />

        {/****** Q3: Code Ends here. ******/}
      </View>
    );
  }
}

class BlackList extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    /****** Q4: Start Coding here. Create State to hold inputs******/
    this.state = { name: '' };
    /****** Q4: Code Ends here. ******/
  }
  /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
  /****** Q4: Code Ends here. ******/

  async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
    this.props.addToBlacklist(this.state.name);
    this.setState({ name: '' });
    /****** Q4: Code Ends here. ******/
  }

  render() {
    return (
      <View style={styles.container}>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <Text>BlackList</Text>
        <TextInput placeholder="Name" value={this.state.name} onChangeText={(name) => this.setState({ name })} />
        <Button title="Submit" onPress={this.handleSubmit} />
        {/****** Q4: Code Ends here. ******/}
      </View>
    );
  }
}

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ issues: data.issueList });
    }
  }

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }

  async addToBlacklist(name) {
    const query = `mutation addToBlacklist($name: String!) {
        addToBlacklist(nameInput: $name)
    }`;

    const data = await graphQLFetch(query, { name });
    if (data) {
      this.loadData();
    }
  }
  render() {
    return (
      <>
        {/****** Q1: Start Coding here. ******/}
        {/****** Q1: Code ends here ******/}
        <IssueFilter />

        {/****** Q2: Start Coding here. ******/}
        {/****** Q2: Code ends here ******/}
        <IssueTable issues={this.state.issues} />

        {/****** Q3: Start Coding here. ******/}
        <IssueAdd createIssue={this.createIssue} />
        {/****** Q3: Code Ends here. ******/}

        {/****** Q4: Start Coding here. ******/}
        <BlackList addToBlacklist={this.addToBlacklist} />
        {/****** Q4: Code Ends here. ******/}
      </>

    );
  }
}
