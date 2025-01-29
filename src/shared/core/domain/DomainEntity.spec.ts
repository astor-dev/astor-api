import { DomainEntity } from "~shared/core/domain/DomainEntity";
import { UniqueEntityID } from "~shared/core/domain/UniqueEntityID";

import { fakerKO as faker } from "@faker-js/faker";

interface TestEntityProps {
  name: string;
}

class TestEntity extends DomainEntity<TestEntityProps> {
  constructor(props: TestEntityProps, id: UniqueEntityID) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }
}

describe("DomainEntity with TestEntity", (): void => {
  it("id와 name 값을 정상적으로 반환해야 한다", (): void => {
    // given
    const name = faker.person.firstName();
    const uniqueEntityIDValue: number = faker.number.int({ min: 1, max: 100 });

    // when
    const testEntity: TestEntity = new TestEntity({ name }, new UniqueEntityID(uniqueEntityIDValue));

    // then
    expect(testEntity.id).toBeDefined();
    expect(testEntity.id.getNumber()).toEqual(uniqueEntityIDValue);
    expect(testEntity.name).toEqual(name);
  });

  it("propsValue를 통해 전체 속성에 접근할 수 있어야 한다", (): void => {
    // given
    const name = faker.person.firstName();
    const uniqueEntityIDValue: number = faker.number.int({ min: 1, max: 100 });

    // when
    const testEntity: TestEntity = new TestEntity({ name }, new UniqueEntityID(uniqueEntityIDValue));

    // then
    expect(testEntity.propsValue).toEqual({ name });
  });
});
