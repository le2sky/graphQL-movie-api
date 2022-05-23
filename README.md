## 1. Apollo Server소개

Apollo 서버는 Apollo 클라이언트를 포함한 모든 GraphQL 클라이언트와 호환되는 사양 준수(spec-compliant)의 오픈 소스 GraphQL 서버입니다. 모든 소스의 데이터를 사용할 수 있는 자체 문서화 가능한 production-ready GraphQL API를 구축하는 가장 좋은 방법입니다.

## 2. Define your GraphQL schema (GraphQL 스키마 정의)

모든 GraphQL 서버(Apollo Server 포함)는 스키마를 사용하여 클라이언트가 쿼리할 수 있는 데이터 구조를 정의합니다.
(스키마는 type definitions의 모음입니다.)

## 3. Scalar types

GraphQL 객체 타입에는 이름과 필드가 있지만 이 필드는 더욱 구체적인 데이터로 해석되어야 합니다. 그 때 스칼라 타입을 사용할 수 있습니다.

GraphQL은 기본 스칼라 타입 세트와 함께 제공됩니다.
ID: ID 스칼라 타입은 객체를 다시 가져오거나 캐시의 키로 자주 사용되는 고유 식별자를 나타냅니다.

```js
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;
```

## 4. Mutations

GraphQL에 대한 대부분은 데이터 fetching이지만, 서버 측 데이터를 수정할 수 있는 방법이 필요합니다. 서버 측 데이터를 수정하는 모든 작업은 mutation을 통해 보내야 한다는 규칙을 설정하는 것이 유용합니다

```js
mutation CreateReview($ep: Episode!, $review: ReviewInput!) {
    createReview(episode: $ep, review: $review) {
        stars
        commentary
    }
}
```

## 5. Lists and Non-Null

아래 Character에 name에 String 타입을 사용하고 느낌표 !를 추가하여 Non-Null로 표시합니다.
Non-Null로 표시하게 되면 서버가 항상 이 필드에 대해 null이 아닌 값을 반환할 것으로 예상합니다. 그래서 null 값을 얻게 되면 클라이언트에게 문제가 있음을 알립니다.

```ts
type Character {
    name: String!
    appearsIn: [Episode]!
}
```

## 6. Resolvers

resolver 함수는 데이터베이스에 액세스한 다음 데이터를 반환합니다.

```JS
// args는 GraphQL 쿼리의 필드에 제공된 인수입니다.
Query: {
    human(obj, args, context, info) {
        return context.db.loadHumanByID(args.id).then(userData => new Human(userData))
    }
}
```

## 7. Resolver arguments

Resolver 함수에는 parent(root or source), args, context, info 의 네 가지 인수가 순서대로 전달됩니다.

```js
User: {
  fullName: (parent, args, context, info) => {
    return "hello";
  },
},
```

## 8. Docstring

type, field 또는 argument에 대한 설명을 제공합니다. 독스트링은 Apollo Studio Explorer를 포함한 많은 일반적인 GraphQL 도구에 자동으로 나타납니다.

```
"""
User에 대해 설명
"""
type User {
  """
  firstName에 대해 설명
  """
  firstName: String!

  age(
  """
  반드시 숫자여야 합니다.
  """
  arg: Int
  )
}
```

https://www.apollographql.com/docs/resources/graphql-glossary/#docstring

Altair GraphQL Client
Altair GraphQL Client는 GraphQL queries 및implementations을 디버그할 때 사용할 수 있습니다. (추가적으로 파일 업로드 기능을 제공)
