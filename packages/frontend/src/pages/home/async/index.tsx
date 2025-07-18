import React from "react";
import { ReactLoadableModuleAsync, RenderModule } from "@app/front-modules";
import { action, observable, computed, reaction } from "mobx";
import { DateTime } from "luxon";
import { Button } from "antd";
import {DownCircleOutlined, LeftOutlined, RightOutlined, UnorderedListOutlined} from "@ant-design/icons";

import { TableController, TableControllerHeaderColumn } from "../../../libs";
import Table, { TableCellRendererProps, TableDataset } from "../../../components/Table";
import VacationCell from "./view/vacation-cell";
import { VacationParserModule } from "../../../modules/vacation-parser";
import FileUploader from "../../../components/FileUploader";
import { exportToExcelMultipleYears } from "../../../libs/exel-service";
import Modal from "../../../components/Modal";
import FormFieldCheckboxes from "../../../components/FormFields/Checkboxes";
import { UserItemEntity } from "./entities";
import EditUserItemModalModule from "./view/sub-modules/edit-user-item-modal-module";

import { SelectMonthYearFieldStyle } from "./style.css";
import {
  buttonContainer, exportButton,
  iconButton,
  tableContainer,
  uploadContainer
} from "./view/vacation-cell/style.css";

export interface UserItem {
  id: string;
  fullName: string;
  vacationDates: string[];
  group: string | null;
}

export interface ForbiddenIntersection {
  employee1: string;
  employee2: string;
  group: string;
}

export default class AsyncModule extends ReactLoadableModuleAsync<{}> {
  parser = new VacationParserModule();
  controller = TableController.build<UserItem>();

  @observable currentMonth = DateTime.local().month;
  @observable currentYear = DateTime.local().year;

  users: UserItem[] = [];

  constructor() {
    super();
    this.mobx();

    reaction(
      () => [this.currentMonth, this.currentYear],
      () => this.rebuildTable(),
      { fireImmediately: true },
    );
  }

  @observable isExportModalOpen = false;
  @observable exportYears: string[] = [];
  @observable selectedExportYears: string[] = [];

  @observable isUserModalOpen = false;
  @observable currentEditingUser: UserItem | undefined = undefined;

  @action getDatesRangeList(from: string, to: string): string[] {
    const start = DateTime.fromISO(from);
    const end = DateTime.fromISO(to);

    const dates: string[] = [];
    let cursor = start.startOf("day");

    while (cursor <= end) {
      const isoDate = cursor.toISODate();
      if (isoDate) {
        dates.push(isoDate);
      }
      cursor = cursor.plus({ days: 1 });
    }

    return dates;
  }

  @action incrementMonth = () => {
    if (this.currentMonth === 12) {
      this.currentMonth = 1;
      this.currentYear += 1;
    } else {
      this.currentMonth += 1;
    }
  };

  @action decrementMonth = () => {
    if (this.currentMonth === 1) {
      this.currentMonth = 12;
      this.currentYear -= 1;
    } else {
      this.currentMonth -= 1;
    }
  };

  @action incrementYear = () => {
    this.currentYear += 1;
  };

  @action decrementYear = () => {
    this.currentYear -= 1;
  };

  @action setSelectedExportYears = (years: string[]) => {
    this.selectedExportYears = years;
  };

  @action
  setExportModalOpen = (open: boolean): void => {
    this.isExportModalOpen = open;
  };

  @computed get getDatasetApiReady() {
    return {
      filterParameters: { currentMonth: this.currentMonth, currentYear: this.currentYear, users: this.users },
    };
  }

  @computed get availableYears(): string[] {
    const years = new Set<string>();

    for (const user of this.users) {
      user.vacationDates.forEach((dateStr) => {
        const date = DateTime.fromISO(dateStr);
        if (date.isValid) {
          years.add(date.year.toString());
        }
      });
    }

    return Array.from(years).sort();
  }

  handleFileUpload = async (file: File): Promise<void> => {
    try {
      await this.parser.parse(file);
      this.users = this.parser.users;
      this.rebuildTable();
    } catch (err) {
      console.error("Ошибка при парсинге:", err);
    }
  };

  async handleFileDelete(fileId: string): Promise<void> {
    console.log("Удалён файл", fileId);
  }

  private onUpload = async (fileWrapper: { rawFile: File }) => {
    await this.handleFileUpload(fileWrapper.rawFile);
  };

  private onDelete = async (fileId: string): Promise<void> => {
    await this.handleFileDelete(fileId);
  };

  @action handleExportExcel = () => {
    const years = this.availableYears;

    if (years.length === 1) {
      const { forbiddenIntersections, weekends } = this.parser;
      exportToExcelMultipleYears(this.users, forbiddenIntersections, weekends, [parseInt(years[0])]);
      return;
    }

    this.exportYears = years;
    this.selectedExportYears = [...years];
    this.isExportModalOpen = true;
  };

  @action rebuildTable() {
    const daysInMonth = DateTime.local(this.currentYear, this.currentMonth).daysInMonth ?? 31;

    const columns: TableControllerHeaderColumn<UserItem>[] = [
      {
        name: "ФИО сотрудника",
        dataKey: undefined,
        renderer: {
          type: "custom",
          renderer: (props: TableCellRendererProps<TableDataset<UserItem>>) => (
            <div>
              {props.value?.fullName}
              <Button icon={<UnorderedListOutlined />} onClick={() => this.openUserModal(props.value!)} className={iconButton}/>
            </div>
          ),
        } as const,
        width: 310,
      },
    ];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = DateTime.local(this.currentYear, this.currentMonth, day).toFormat("yyyy-MM-dd");

      columns.push({
        name: String(day),
        dataKey: undefined,
        width: 45,
        alignment: "center",
        renderer: {
          type: "custom",
          renderer: (props) => (
            <VacationCell
              {...props}
              date={date}
              allUsers={this.users}
              forbiddenIntersections={this.parser.forbiddenIntersections}
            />
          ),
        } as const,
      });
    }

    const filteredUsers = this.users.filter((user) => {
      return user.vacationDates.some((dateStr) => {
        try {
          const date = DateTime.fromISO(dateStr);
          return date.isValid && date.year === this.currentYear;
        } catch {
          return false;
        }
      });
    });

    this.controller.createHeaderColumns(columns);
    this.controller.createDataset(filteredUsers);
  }

  @action openUserModal = (user: UserItem | undefined) => {
    this.currentEditingUser = user;
    this.isUserModalOpen = true;
  };

  @action closeUserModal = () => {
    this.isUserModalOpen = false;
    this.currentEditingUser = undefined;
  };

  @action handleUserDelete = (userId: string) => {
    this.users = this.users.filter((u) => u.id !== userId);
    this.rebuildTable();
    this.closeUserModal();
  };

  @action handleUserModalSubmit = (updatedUser: UserItemEntity) => {
    const index = this.users.findIndex((u) => u.id === updatedUser.id);
    const plainUser: UserItem = {
      id: updatedUser.id,
      fullName: updatedUser.fullName,
      group: updatedUser.group,
      vacationDates: updatedUser.vacationDates,
    };

    if (index !== -1) {
      this.users[index] = plainUser;
    } else {
      this.users.push(plainUser);
    }

    this.rebuildTable();
    this.closeUserModal();
  };

  render() {
    const currentMonth = DateTime.fromObject({ month: this.currentMonth })
      .setLocale("ru")
      .toFormat("LLLL")
      .toUpperCase();
    const currentYear = this.currentYear;

    return (
      <div>
        <div className={SelectMonthYearFieldStyle}>
          <div>
            <Button icon={<LeftOutlined/>} onClick={this.decrementYear}/>
            <span style={{margin: "0 8px"}}>{currentYear}</span>
            <Button icon={<RightOutlined/>} onClick={this.incrementYear}/>
          </div>
          <div>
            <Button icon={<LeftOutlined/>} onClick={this.decrementMonth}/>
            <span style={{margin: "0 8px"}}>{currentMonth}</span>
            <Button icon={<RightOutlined/>} onClick={this.incrementMonth}/>
          </div>
        </div>
        <div className={tableContainer}>
          <Table
            headerColumns={this.controller._resultHeaderColumns}
            dataset={this.controller._resultDataset}
            emptyTextDescription="Нет данных"
          />
        </div>
        <div className={buttonContainer}>
          <Button onClick={() => this.openUserModal(undefined)}>
            Добавить нового сотрудника
          </Button>
        </div>
        <div className={uploadContainer}>
          <FileUploader
            files={[]}
            multiple={false}
            acceptTypes=".xls,.xlsx"
            dragDropAreaText="Загрузите файл с отпусками"
            onUploadFile={this.onUpload}
            onDeleteFile={this.onDelete}
          />
          <Button
            type="primary"
            className={exportButton}
            onClick={this.handleExportExcel}
            icon={<DownCircleOutlined />}
          >
            Скачать Excel
          </Button>
        </div>
        <Modal
          opened={this.isExportModalOpen}
          onClose={() => this.setExportModalOpen(false)}
          title="Выберите год для экспорта"
          width={400}
        >
          <FormFieldCheckboxes
            items={this.exportYears.map((y) => ({label: y, value: y}))}
            value={this.selectedExportYears}
            setValue={(val) => {
              this.setSelectedExportYears(val);
            }}
            searchable={false}
            scroll={false}
          />
          <div style={{marginTop: 16, display: "flex", justifyContent: "flex-end"}}>
            <Button
              type="primary"
              disabled={this.selectedExportYears.length === 0}
              onClick={() => {
                const {forbiddenIntersections, weekends} = this.parser;

                exportToExcelMultipleYears(
                  this.users,
                  forbiddenIntersections,
                  weekends,
                  this.selectedExportYears.map((y) => parseInt(y)),
                );

                this.setExportModalOpen(false);
              }}
            >
              Скачать
            </Button>
          </div>
        </Modal>
        <RenderModule
          Module={EditUserItemModalModule}
          opened={this.isUserModalOpen}
          onClose={this.closeUserModal}
          onSubmit={this.handleUserModalSubmit}
          onDelete={this.handleUserDelete}
          user={this.currentEditingUser}
        />
      </div>
    );
  }
}
