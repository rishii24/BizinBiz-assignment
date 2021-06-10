import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EmployeeData from '../EmployeeDataset.json'


import './EmployeeTable.css';


const useStyles = makeStyles({
    table: {
        width: "90vw",
        display: "flex",
        flexDirection: "column"
    },
    tableHead: {
        display: "flex",
        flexDirection: "column",
    },
    tableBody: {
        display: "flex",
    },
    tableRow: {
        display: "flex",
        flexDirection: "column"
    }
});

const EmployeeTable = () => {

    var data = EmployeeData;

    var tempResult = {}

    for (let { location } of data)
        tempResult[location] = {
            location,
            count: tempResult[location] ? tempResult[location].count + 1 : 1

        }

    let result = Object.values(tempResult)
    // console.log(result);




    var sumSalary = result.map((x) => {
        var mergeData = data.filter(a1 => a1.location === x.location);
        // console.log(mergeData);
        let avgOfSalary = 0;
        mergeData.forEach(t => {
            avgOfSalary += Number(t.currSalary.replace(/[^0-9\.-]+/g, "")) / x.count;

        })
        // console.log(avgOfSalary);
        // console.log(mergeData);
        return avgOfSalary
        // return mergeData;

    });

    console.log(sumSalary)


    const classes = useStyles();

    return (
        <div className="tableContainer">
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">

                    <TableHead className="tableHead">
                        <TableRow className="tableRow">
                            <TableCell className="tableTitle" align="center">Location</TableCell>
                            <TableCell className="tableTitle" align="center">Salary</TableCell>
                        </TableRow>
                    </TableHead>

                    <div className="content">
                        <TableBody className="tableBody">
                            <TableRow >
                                {result.map((result, index) => (
                                    <TableRow className="tableRow2">
                                        <TableCell className="tableRow2" component="th" scope="row" align="center" key={result.index}>
                                            {result.location}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableRow>
                        </TableBody>
                        <TableBody className="tableBody">
                            <TableRow>
                                {sumSalary.map((result, index) => (
                                    <TableRow>
                                        <TableCell className="tableRow2" component="th" scope="row" align="center" key={result.index}>
                                            ${result}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableRow>

                        </TableBody>
                    </div>
                </Table>
            </TableContainer>
        </div>
    )
}

export default EmployeeTable
