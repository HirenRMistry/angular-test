import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { DebugElement } from '@angular/core';

import {Component, ViewChild, Type, Provider, OnInit} from '@angular/core';
import { TableComponent } from './table.component';

//Import Sort, Paginator Modules for Table
import { MatPaginator } from '@angular/material/paginator';
import { MatSort  } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table'
import { TableData } from '../../app.component';

// Function creates TestData for a given number
function createTestData(id: number): TableData {
    return {
      city: 'City' + id.toString(),
      conditions: 'Sunny',
      temperature: 17,
      description: 'description'+ id.toString()
    };
  }

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule , MatTableModule],
      declarations: [ TableComponent, MatPaginator,  MatSort,  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test for City Filter', () => {
    // Create Test Data  and set TestData in table
    const testData : TableData[] = Array.from({ length: 15 }, (_, k) => createTestData(k));;
    component.dataSource = new MatTableDataSource<TableData>(testData);

    // Filter for the name of the city = 'City13'
    component.dataSource.filter = 'City13';
    fixture.detectChanges();

    var row = fixture.debugElement.nativeNode.innerText.split('\n')[2];
    expect(row).toContain('City13');
  });

  it('Test for Pagination', () => {
    // Create Test Data  and set TestData in table
    const testData : TableData[] = Array.from({ length: 15 }, (_, k) => createTestData(k));;
    component.dataSource = new MatTableDataSource<TableData>(testData);
    // Define paginator and attributes
    component.dataSource.paginator = component.paginator;
    component.paginator.pageSize = 5;
    component.paginator.length = 15;

    // Go to Next Page
    component.paginator.nextPage();
    fixture.detectChanges();

    // Test for correct Data in table in next Page
    for (var _i = 0; _i < 5; _i++) {
      var row = fixture.debugElement.nativeNode.innerText.split('\n')[2+_i];
      expect(row).toContain('City' + (_i+5).toString());
    }
    row = fixture.debugElement.nativeNode.innerText.split('\n')[9];
    expect(row).toEqual('6 – 10 of 15');

  });



});
