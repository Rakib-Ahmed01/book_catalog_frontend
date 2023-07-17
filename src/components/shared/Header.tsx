/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Avatar,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  Header,
  Text,
  createStyles,
  rem,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconBook } from "@tabler/icons-react"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { selectUser, userLoggedOut } from "../../features/auth/authSlice"
import useAuth from "../../hooks/useAuth"
import { User } from "../../types"

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}))

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)
  const { classes, theme } = useStyles()
  const auth: boolean = useAuth()
  const user = useSelector(selectUser) as any as User
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = () => {
    dispatch(userLoggedOut)
    localStorage.removeItem("book-catalog-auth")
    toast.success("Logged in successfully")
    navigate("/")
    window.location.reload()
  }

  return (
    <Box pb={10}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Link to="/">
            <IconBook size={30} color={theme.colors.blue[5]} />
          </Link>

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link to="/books" className={classes.link}>
              Books
            </Link>
            {auth ? (
              <>
                <Link to="/add-new-book" className={classes.link}>
                  Add New Book
                </Link>{" "}
                <Link to="/wishlist" className={classes.link}>
                  Wishlist
                </Link>
                <Link to="/currently-reading" className={classes.link}>
                  Currently Reading
                </Link>
              </>
            ) : null}
          </Group>

          <Group className={classes.hiddenMobile}>
            {!auth ? (
              <>
                <Link to="/login">
                  <Button variant="default">Log in</Button>
                </Link>
                <Link to={"/register"}>
                  <Button>Register</Button>
                </Link>
              </>
            ) : (
              <>
                <Flex
                  justify={"center"}
                  align={"center"}
                  sx={{
                    background: theme.colors.gray[1],
                    borderRadius: "500px",
                  }}
                  px={10}
                  py={2}
                >
                  <Avatar
                    src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${user.email}`}
                    ml={5}
                  />
                  <Text>{user.name}</Text>
                </Flex>
                <Button onClick={handleLogOut}>Log out</Button>
              </>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <Link to="/books" className={classes.link}>
          Books
        </Link>
        <Link to="/add-new-book" className={classes.link}>
          Add New Book
        </Link>

        <Divider
          my="sm"
          color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
        />

        <Group px={4}>
          {!auth ? (
            <>
              <Link to="/login">
                <Button variant="default">Log in</Button>
              </Link>
              <Link to={"/register"}>
                <Button>Register</Button>
              </Link>
            </>
          ) : (
            <Button onClick={handleLogOut}>Log out</Button>
          )}
        </Group>
      </Drawer>
    </Box>
  )
}
