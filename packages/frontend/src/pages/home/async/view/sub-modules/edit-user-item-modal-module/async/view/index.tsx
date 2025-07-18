import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Input } from "antd";
import { DateTime } from "luxon";

import Modal from "components/Modal";
import Form from "components/Form";
import FormField from "components/FormField";
import { MultipleDatePicker } from "components/DateTime/DatePicker";
import { DateRange, UserItemEntity } from "pages/home/async/entities/user-item-entity";

import { UserItem } from "../../../../../index";

import { addPeriodStyles, periodItemStyles, periodStyles } from "./style.css";

export type EditUserItemModalProps = {
  user?: UserItem;
  opened: boolean;
  onClose: () => void;
  onSubmit: (user: UserItemEntity) => void;
  onDelete?: (userId: string) => void;
};

function EditUserItemModalModule({ user, opened, onClose, onSubmit, onDelete }: EditUserItemModalProps) {
  const [userData, setUserData] = useState<UserItemEntity>(() =>
    user ? UserItemEntity.build(user) : UserItemEntity.buildEmpty(),
  );

  useEffect(() => {
    if (user) {
      setUserData(UserItemEntity.build(user));
    } else {
      setUserData(UserItemEntity.buildEmpty());
    }
  }, [user]);

  const [pickerValue, setPickerValue] = useState<DateRange | null>(null);

  const handleAddVacationPeriod = () => {
    if (pickerValue?.[0] && pickerValue?.[1]) {
      userData.addVacationPeriod(pickerValue);
      setPickerValue(null);
    }
  };

  const handleRemoveVacationPeriod = (range: DateRange) => {
    userData.removeVacationPeriod(range);
  };

  const handleFormSubmit = () => {
    onSubmit(userData);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title={userData.id ? "Создать сотрудника" : "Редактировать сотрудника"}>
      <Form onSubmit={handleFormSubmit}>
        <FormField title="ФИО сотрудника" required>
          <Input value={userData.fullName} onChange={(e) => userData.setFullName(e.target.value)} />
        </FormField>

        <FormField title="Группа" required>
          <Input value={userData.group ?? ""} onChange={(e) => userData.setGroup(e.target.value)} />
        </FormField>

        <FormField title="Добавить период отпуска">
          <div className={addPeriodStyles}>
            <MultipleDatePicker
              value={pickerValue ? [pickerValue[0]?.toJSDate() ?? null, pickerValue[1]?.toJSDate() ?? null] : null}
              onChange={(value) => {
                if (!value) {
                  setPickerValue(null);
                  return;
                }

                const [from, to] = value;
                const fromDateTime = from ? DateTime.fromJSDate(from) : null;
                const toDateTime = to ? DateTime.fromJSDate(to) : null;

                if (fromDateTime && toDateTime) {
                  setPickerValue([fromDateTime, toDateTime]);
                } else if (fromDateTime) {
                  setPickerValue([fromDateTime, fromDateTime]);
                } else if (toDateTime) {
                  setPickerValue([toDateTime, toDateTime]);
                } else {
                  setPickerValue(null);
                }
              }}
            />
            <Button type="primary" onClick={handleAddVacationPeriod}>
              Добавить
            </Button>
            s
          </div>
        </FormField>

        <FormField title="Даты отпуска">
          <div className={periodStyles}>
            {userData
              .groupDatesIntoRanges(userData.vacationDates)
              .sort((a, b) => a[0].toMillis() - b[0].toMillis())
              .map(([start, end], index) => (
                <div key={index} className={periodItemStyles}>
                  <span>
                    {start.toFormat("dd.LL.yyyy")} – {end.toFormat("dd.LL.yyyy")}
                  </span>
                  <Button size="small" onClick={() => handleRemoveVacationPeriod([start, end])}>
                    Удалить
                  </Button>
                </div>
              ))}
          </div>
        </FormField>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
          {user?.id && onDelete && (
            <Button danger onClick={() => onDelete(user.id!)}>
              Удалить сотрудника
            </Button>
          )}

          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default observer(EditUserItemModalModule);
