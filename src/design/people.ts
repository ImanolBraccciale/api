interface FilterStrategy {
    apply(query: any): any;
  }
  
  class TextFilterStrategy implements FilterStrategy {
    constructor(private field: string, private value: string) {}
    apply(query: any) {
      return { ...query, [this.field]: { $regex: this.value, $options: 'i' } };
    }
  }
  
  class NumberRangeFilterStrategy implements FilterStrategy {
    constructor(private field: string, private min: number, private max: number) {}
    apply(query: any) {
      return { ...query, [this.field]: { $gte: this.min, $lte: this.max } };
    }
  }
  
  class ArrayContainsFilterStrategy implements FilterStrategy {
    constructor(private field: string, private value: string) {}
    apply(query: any) {
      return { ...query, [this.field]: { $in: [this.value] } };
    }
  }
  
  export class PeopleFilterBuilder {
    private filters: FilterStrategy[] = [];
  
    addTextFilter(field: string, value: string) {
      this.filters.push(new TextFilterStrategy(field, value));
      return this;
    }
  
    addNumberRangeFilter(field: string, min: number, max: number) {
      this.filters.push(new NumberRangeFilterStrategy(field, min, max));
      return this;
    }
  
    addArrayContainsFilter(field: string, value: string) {
      this.filters.push(new ArrayContainsFilterStrategy(field, value));
      return this;
    }
  
    build() {
      return (query: any) => {
        return this.filters.reduce((acc, filter) => filter.apply(acc), query);
      };
    }
  }
  