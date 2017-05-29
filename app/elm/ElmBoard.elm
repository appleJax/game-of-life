port module ElmBoard exposing (..)

import Array
import Array2D
import Html exposing (..)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Result exposing (..)


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- PORTS


port currentGen : Int -> Cmd msg


port clearBoardClicked : msg -> Sub msg


port changeSizeClicked : (Int -> Int -> msg) -> Sub msg


port changeSpeedClicked : (Int -> msg) -> Sub msg


port newBoardClicked : msg -> Sub msg


port nextGenClicked : (Time -> msg) -> Sub msg


port pauseClicked : msg -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions model =
    let
        listSubs =
            [ clearBoardClicked ClearBoard
            , changSizeClicked ChangeSize
            , changeSpeedClicked ChangeSpeed
            , newBoardClicked NewBoard
            , nextGenClicked NextGen
            , pauseClicked Pause
            ]
    in
        Sub.batch <|
            if model.paused then
                listSubs
            else
                append listSubs (Time.every (model.speed * millisecond) NextGen)



-- MODEL


init : ( Model, Cmd Msg )
init =
    ( Model Array.fromList [ Array.fromList [ False, False, False ], Array.fromList [ False, False, False ] ], Cmd.none )


type alias Model =
    { board : Array (Array Int)
    , speed : Int
    , paused : Bool
    }


type alias Cell =
    { x : Int
    , y : Int
    }


type Msg
    = ClearBoard
    | ChangeSize Int Int
    | ChangeSpeed Int
    | NewBoard
    | NextGen Time
    | Pause
    | ToggleCell Cell



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        oldBoard =
            model.board
    in
        case msg of
            ClearBoard ->
                ( { model
                    | board = clearBoard oldBoard
                    , generation = 0
                  }
                , sendGen 0
                )

            ChangeSize x y ->
                ( { model | board = changeBoardSize oldBoard x y }, Cmd.none )

            ChangeSpeed newSpeed ->
                ( { model | speed = newSpeed }, Cmd.none )

            NewBoard ->
                ( { model
                    | board = newBoard oldBoard
                    , generation = 0
                  }
                , sendGen 0
                )

            NextGen _ ->
                let
                    newGen =
                        model.generation + 1
                in
                    ( { model
                        | board = calcNextBoard oldBoard
                        , generation = newGen
                      }
                    , sendGen newGen
                    )

            Pause ->
                { model | paused = not model.paused }

            ToggleCell cell ->
                { model | board = toggleCell oldBoard cell }


toggleCell : Array2D Int -> Cell -> Array2D Int
toggleCell board cell =
    let
        maybeStatus =
            Array2D.get cell.y cell.x board
    in
        case maybeStatus of
            Just 0 ->
                Array2D.set cell.y cell.x 1 board

            Nothing ->
                board

            _ ->
                Array2D.set cell.y cell.x 0 board



-- VIEW


view : Model -> Html Msg
view model =
    div [] []



-- UTILITY FUNCTIONS


clearBoard : Array2D Int -> Array2D Int
clearBoard currentBoard =
    let
        rows =
            Array2D.rows currentBoard

        columns =
            Array2D.columns currentBoard
    in
        Array2D.repeat rows columns 0


newBoard : Array2D Int -> Array2D Int
newBoard board =
    board


changeBoardSize : Array2D Int -> Array2D Int
changeBoardSize board =
    board


calcNextBoard : Array2D Int -> Array2D Int
calcNextBoard board =
    board
