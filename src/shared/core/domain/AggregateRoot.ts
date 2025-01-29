import {
  DomainEntity,
  DomainEntityProps,
} from 'src/shared/core/domain/DomainEntity';
import { UniqueEntityID } from 'src/shared/core/domain/UniqueEntityID';

export interface AggregateRootProps extends DomainEntityProps {}

export abstract class AggregateRoot<
  T extends AggregateRootProps,
> extends DomainEntity<T> {
  protected constructor(props: T, id?: UniqueEntityID) {
    super(props, id);
  }
}
